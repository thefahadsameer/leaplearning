exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    const userMessage = message.toLowerCase();

    let reply = "";

    if (
      userMessage.includes("admission") ||
      userMessage.includes("apply")
    ) {
      reply =
        "You can apply online through our Apply Now page. We offer PhD, DBA, DLitt, Post Doctorate, Professorship and Honorary Doctorate programs.";
    }

    else if (
      userMessage.includes("program") ||
      userMessage.includes("course")
    ) {
      reply =
        "Leap Learning offers PhD, DBA, DLitt, Post Doctorate, Professorship and Honorary Doctorate programs through international university partnerships.";
    }

    else if (
      userMessage.includes("fee") ||
      userMessage.includes("fees") ||
      userMessage.includes("cost")
    ) {
      reply =
        "Program fees vary depending on the university and program selected. Please contact our admissions team for the latest fee structure.";
    }

    else if (
      userMessage.includes("status")
    ) {
      reply =
        "To check your application status, please contact our admissions team with your application ID or registered email address.";
    }

    else if (
      userMessage.includes("hello") ||
      userMessage.includes("hi") ||
      userMessage.includes("hey")
    ) {
      reply =
        "Hello! Welcome to Leap Learning. How may I assist you today?";
    }

    else {
      reply =
        "Thank you for contacting Leap Learning. Please ask about admissions, programs, fees, application status, or our academic services.";
    }

    res.json({
      reply
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};