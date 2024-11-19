const { fal } = require("@fal-ai/client");

fal.config({
  credentials: process.env.FAL_API_KEY
});

async function imageGeneration(prompt, size="square_hd", model="flux-pro/new", num_inference_steps=28, guidance_scale=3.5, num_images=1, safety_tolerance=6) {
    const result = await fal.subscribe(`fal-ai/${model}`, {
        input: {
          prompt: prompt
        },
        enable_safety_checker: false,
        logs: true,
        image_size: size,
        safety_tolerance: safety_tolerance,
        num_inference_steps: num_inference_steps,
        guidance_scale: guidance_scale,
        num_images: num_images,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      });
      return result.data
}

async function imageUpscale(image_url, model="clarity-upscaler", upscale_factor=2, num_inference_steps=20) {
    const result = await fal.subscribe(`fal-ai/${model}`, {
        input: {
          image_url: image_url
        },
        upscale_factor:upscale_factor,
        enable_safety_checker:false,
        num_inference_steps:num_inference_steps,
        negative_prompt: "(worst quality, low quality, normal quality:2)",
        prompt: "masterpiece, best quality, highres",
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      });
      return result.data
}



module.exports = {
    imageGeneration, imageUpscale
}