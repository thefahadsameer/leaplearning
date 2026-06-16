exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    const userMessage = message.toLowerCase();

    let reply = "";

    /* ================= GREETING ================= */

    if (
      userMessage.includes("hello") ||
      userMessage.includes("hi") ||
      userMessage.includes("hey")
    ) {
      reply =
        "Hello! Welcome to Leap Learning. How may I assist you today?";
    }

    /* ================= PHD ================= */

    else if (
      userMessage.includes("phd")
    ) {
      reply =
        "Leap Learning offers internationally recognized PhD programs through our university partners. Please let us know if you would like information about eligibility, fees, or duration.";
    }

    /* ================= DBA ================= */

    else if (
      userMessage.includes("dba")
    ) {
      reply =
        "Our Doctor of Business Administration (DBA) program is designed for working professionals and business leaders seeking advanced academic recognition.";
    }

    /* ================= DLITT ================= */

    else if (
      userMessage.includes("dlitt")
    ) {
      reply =
        "The Doctor of Letters (DLitt) program recognizes distinguished contributions in literature, education, research, public service, and related fields.";
    }

    /* ================= HONORARY DOCTORATE ================= */

    else if (
      userMessage.includes("honorary")
    ) {
      reply =
        "Our Honorary Doctorate pathway recognizes exceptional achievements, leadership, innovation, philanthropy, and social impact.";
    }

    /* ================= FEES ================= */

    else if (
      userMessage.includes("fee") ||
      userMessage.includes("fees") ||
      userMessage.includes("cost")
    ) {
      reply =
        "Program fees vary depending on the selected university and program. Please tell us which program you are interested in.";
    }

    /* ================= ADMISSIONS ================= */

    else if (
      userMessage.includes("admission") ||
      userMessage.includes("apply")
    ) {
      reply =
        "You can apply online through our Apply Now page. Our admissions team will guide you through document verification and enrollment.";
    }

    /* ================= DEFAULT ================= */

    else {
      reply =
        "Thank you for contacting Leap Learning. You may ask about PhD, DBA, DLitt, Honorary Doctorate, Admissions, or Program Fees.";
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