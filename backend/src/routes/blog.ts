import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@meraj05/input-validation";

export const blogRouter = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
  Variables: {
    userId: string;
  };
}>();

// middleware
blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("Authorization") || "";
  try {
    const response = await verify(token, c.env.JWT_SECRET);
    if (response.id) {
      c.set("userId", response.id as string);
      await next();
    } else {
      c.status(403);
      return c.json({ msg: "Not-logged-in" });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      msg: "error occured",
    });
  }
});

// routes
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const authorId = c.get("userId");
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        msg: "Incorrect Input",
      });
    }

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });
    if (!blog) {
      c.status(500);
      return c.json({ msg: "Blog-not-created" });
    }
    return c.json({ id: blog.id });
  } catch (e) {
    c.status(500);
    return c.json({ msg: "error occured while creating blog" });
  }
});

blogRouter.put("/user", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.get("userId");
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    return c.json({ user });
  } catch (error) {
    c.status(500);
    return c.text("Admin");
  }
});

blogRouter.put("/edit", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        msg: "Incorrect Input",
      });
    }
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
        issuedOn: new Date(),
      } as any,
    });
    if (!blog) {
      c.status(500);
      return c.json({ msg: "Blog-not-updated" });
    }
    return c.json({ id: blog.id });
  } catch (e) {
    c.status(500);
    return c.json({ msg: "error-while-updating" });
  }
});

blogRouter.get("/myblogs", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.get("userId");
  try {
    const blogs = await prisma.post.findMany({
      where: {
        authorId: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
        issuedOn: true,
      } as any,
    });

    return c.json({
      blogs,
    });
  } catch (e) {
    c.status(500);
    return c.json({
      msg: "Error while fetching blog post",
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
      issuedOn: true,
    } as any,
  });

  return c.json({
    blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
        issuedOn: true,
      } as any,
    });

    return c.json({
      blog,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      msg: "Error while fetching blog post",
    });
  }
});

blogRouter.delete("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  try {
    const blog = await prisma.post.delete({
      where: {
        id: id,
      },
    });

    return c.text("true");
  } catch (e) {
    c.status(500);
    return c.text("false");
  }
});
