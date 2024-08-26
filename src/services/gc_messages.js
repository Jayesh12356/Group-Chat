const {
  getGCMessage,
  createGCMessage,
  updateGCMessage,
} = require("../repositories/mysql/gc_messages");

const { updateGCLike } = require("../repositories/mysql/gc_likes");

const {
  getGCMessageReactions,
} = require("../repositories/mysql/gc_message_reactions_view");

const { getGCGroupMember } = require("../repositories/mysql/gc_group_members");

const { getGCUser } = require("../repositories/mysql/gc_users");

const { getGCGroup } = require("../repositories/mysql/gc_groups");

module.exports.sendGCMessageServ = async (req) => {
  try {
    const { group_id, user_id, message } = req.body;

    // Validate fields
    if (!group_id || !user_id || !message) {
      throw new Error("Group ID, User ID, and message are required");
    }

    // Check if user exists and belongs to the group
    const user = await getGCUser({ id: user_id });
    if (!user.length) {
      throw new Error("User not found");
    }

    const group = await getGCGroup({ id: group_id });
    if (!group.length) {
      throw new Error("Group does not exists");
    }

    const groupMember = await getGCGroupMember({ group_id, user_id });
    if (!groupMember.length) {
      throw new Error("User is not a member of the group");
    }

    // Send message
    const newMessage = await createGCMessage({
      group_id,
      user_id,
      message,
      is_deleted: false,
    });

    req.response.data = newMessage;
    req.response.message = "Message sent successfully";
  } catch (error) {
    req.response.data = null;
    req.response.message = error.message;
    req.response.code = 400;
  }
};

module.exports.editGCMessageServ = async (req) => {
  try {
    const { message_id, user_id, message } = req.body;

    // Validate fields
    if (!message_id || !user_id || !message) {
      throw new Error(
        "Message ID, User ID, and new message content are required"
      );
    }

    // Check if message exists and belongs to the user
    const existingMessage = await getGCMessage({
      id: message_id,
      user_id,
      is_deleted: false,
    });
    if (!existingMessage.length) {
      throw new Error(
        "Message not found or user does not have permission to edit"
      );
    }

    // Update the message
    const updatedMessage = await updateGCMessage(
      { message },
      { id: message_id }
    );

    req.response.data = updatedMessage;
    req.response.message = "Message updated successfully";
  } catch (error) {
    req.response.data = null;
    req.response.message = error.message;
    req.response.code = 400;
  }
};

module.exports.deleteGCMessageServ = async (req) => {
  try {
    const { message_id, user_id } = req.body;

    // Validate fields
    if (!message_id || !user_id) {
      throw new Error("Message ID and User ID are required");
    }

    // Check if message exists and belongs to the user
    const existingMessage = await getGCMessage({
      id: message_id,
      user_id,
      is_deleted: false,
    });
    if (!existingMessage.length) {
      throw new Error(
        "Message not found or user does not have permission to delete"
      );
    }

    // Delete the message
    const updatedMessage = await updateGCMessage(
      { is_deleted: true },
      { id: message_id }
    );

    const updatedreaction = await updateGCLike(
      { is_deleted: true },
      { message_id: message_id }
    );

    req.response.data = null;
    req.response.message = "Message deleted successfully";
  } catch (error) {
    req.response.data = null;
    req.response.message = error.message;
    req.response.code = 400;
  }
};

module.exports.getGCGroupMessagesServ = async (req) => {
  try {
    const { group_id } = req.body;

    const messages = await getGCMessage({ group_id });

    req.response.data = messages;
    req.response.message = "Messages retrieved successfully";
  } catch (error) {
    req.response.data = 0;
    req.response.message = error.message;
    req.response.code = 400;
  }
};

module.exports.getGCMessageReactionsServ = async (req) => {
  try {
    const { message_id } = req.body;

    const reactions = await getGCMessageReactions({ message_id });

    req.response.data = reactions;
    req.response.message = "Reactions retrieved successfully";
  } catch (error) {
    req.response.data = 0;
    req.response.message = error.message;
    req.response.code = 400;
  }
};
