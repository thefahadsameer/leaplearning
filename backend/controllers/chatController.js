exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    res.json({
      reply: `You asked: ${message}`
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};