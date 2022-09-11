import { FastifyPluginAsync } from "fastify";

// import { MultipartFile } from "@fastify/multipart";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    reply.type("text/html");
    return `
    <html>
    
      <body>
        <form action="/" method='POST' enctype='multipart/form-data'>
          <input name='images' multiple type='file' />
          <input type='submit' value='submit' />
        </form>
      </body>
    </html>
  
  `;
  });

  // const body = {
  //   type: "object",
  //   properties: {
  //     images: {
  //       type: "array",
  //       items: fastify.getSchema("mySharedSchema"),
  //       minItems: 1,
  //       maxItems: 400,
  //     },
  //   },
  //   additionalProperties: true,
  // };

  fastify.post(
    "/",
    {
      // schema: {
      //   body: body,
      // },
    },
    async (req, reply) => {
      const files = await req.saveRequestFiles();
      console.log(files);

      return files.map((file) => file.filepath);
    }
  );
};

export default root;
