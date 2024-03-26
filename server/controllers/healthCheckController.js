export const healthCheck = async (req, res) => {
  try {
    return res.status(200).json({ status: "success", message: "All systems running" });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: "Something went wrong" });
  }
};