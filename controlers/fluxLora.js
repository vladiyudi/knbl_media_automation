const { fal } = require("@fal-ai/client");

fal.config({
  credentials: process.env.FAL_API_KEY
});




const generateFluxLora = async (req, res) => {
const prompt = req.body.prompt

try {
    const result = await fal.subscribe("fal-ai/flux-lora", {
    input: {
      loras: [{
        path: "https://storage.googleapis.com/fal-flux-lora/4fdcb0ef752640cd9120de6d85609876_pytorch_lora_weights.safetensors",
        scale: 1
      }],
      prompt: prompt,
      embeddings: [],
      model_name: null,
      enable_safety_checker: false
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        update.logs.map((log) => log.message).forEach(console.log);
      }
    },
    
  });

  res.status(200).json({
    message: "success",
    result
  })

}
catch(e){
    console.log(e)
}
    
}

module.exports = {
    generateFluxLora
}