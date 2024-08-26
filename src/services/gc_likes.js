const { createGCLike } = require("../repositories/mysql/gc_likes");

const { getGCMessage } = require("../repositories/mysql/gc_messages");

const { getGCUser } = require("../repositories/mysql/gc_users");

module.exports.reactToMessageServ = async (req) => {
  try {
    const { message_id, user_id, reaction_type } = req.body;

    // Validate fields
    if (!message_id || !user_id || !reaction_type) {
      throw new Error("Message ID, User ID, and reaction type are required");
    }

    // Validate reaction_type
    const validReactions = ["like", "love", "laugh", "sad", "angry"];
    if (!validReactions.includes(reaction_type)) {
      throw new Error("Invalid reaction type");
    }

    // Check if user exists
    const user = await getGCUser({ id: user_id });
    if (!user.length) {
      throw new Error("User not found");
    }

    // Check if message exists and belongs to the user
    const existingMessage = await getGCMessage({
      id: message_id,
      is_deleted: false,
    });
    if (!existingMessage.length) {
      throw new Error("Message not found");
    }

    // Add reaction
    const reaction = await createGCLike({
      message_id,
      user_id,
      reaction_type,
    });

    req.response.data = reaction;
    req.response.message = "Reaction added successfully";
  } catch (error) {
    req.response.data = null;
    req.response.message = error.message;
    req.response.code = 400;
  }
};
