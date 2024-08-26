const {
  getGCGroupMember,
  createGCGroupMember,
  updateGCGroupMember,
} = require("../repositories/mysql/gc_group_members");

const { getGCGroup } = require("../repositories/mysql/gc_groups");

const { getGCUser } = require("../repositories/mysql/gc_users");

const {
  getGCGroupRole,
  createGCGroupRole,
  updateGCGroupRole,
} = require("../repositories/mysql/gc_group_roles");

module.exports.addGCGroupMemberServ = async (req) => {
  try {
    const { group_id, user_id, requester_id, role = "member" } = req.body;

    // Validate fields
    if (!group_id || !user_id || !requester_id) {
      throw new Error("Group ID, User ID, and Requester ID are required");
    }
    // Check if the user to be added exist exists
    const users = await getGCUser({ id: user_id });
    if (!users.length) {
      throw new Error("user does not exists");
    }

    const requester = await getGCUser({ id: requester_id });
    if (!requester.length) {
      throw new Error("requester does not exists");
    }

    // Check if the group name already exists
    const existingGroup = await getGCGroup({ id: group_id, is_deleted: false });
    if (!existingGroup.length) {
      throw new Error("Group does not exists");
    }

    // Ensure the requester is an admin
    const requesterRole = await getGCGroupRole({
      group_id: group_id,
      user_id: requester_id,
    });

    if (!requesterRole.length || requesterRole[0].dataValues.role !== "admin") {
      throw new Error("Only group admins can add members to a group");
    }

    // Check if the user is already a member
    const existingMember = await getGCGroupMember({
      group_id,
      user_id,
      is_member: true,
    });

    if (existingMember.length) {
      throw new Error("User is already a member of the group");
    }

    // Check if the user was removed in that case just make the use active again
    const existingkickedMember = await getGCGroupMember({
      group_id,
      user_id,
      is_member: false,
    });

    if (existingkickedMember.length) {
      newMember = await updateGCGroupMember(
        { is_member: true },
        { group_id, user_id }
      );
      await updateGCGroupRole({ is_active: true, role }, { group_id, user_id });
    } else {
      newMember = await createGCGroupMember({
        group_id,
        user_id,
        is_member: true,
      });

      // Add member to group with the specified role
      const newMemberRole = await createGCGroupRole({
        group_id,
        user_id,
        role,
        is_active: true,
      });
    }

    req.response.message = "Member added to group successfully";
  } catch (error) {
    req.response.data = null;
    req.response.message = error.message;
    req.response.code = 400;
  }
};

module.exports.removeGCGroupMemberServ = async (req) => {
  try {
    const { group_id, user_id, requester_id } = req.body;

    // Validate fields
    if (!group_id || !user_id || !requester_id) {
      throw new Error("Group ID, User ID, and Requester ID are required");
    }

    // Check if the user to be added exist exists
    const users = await getGCUser({ id: user_id });
    if (!users.length) {
      throw new Error("user does not exists");
    }

    const requester = await getGCUser({ id: requester_id });
    if (!requester.length) {
      throw new Error("requester does not exists");
    }

    // Check if the group name already exists
    const existingGroup = await getGCGroup({ id: group_id, is_deleted: false });
    if (!existingGroup.length) {
      throw new Error("Group does not exists");
    }

    // Ensure the requester is an admin
    const requesterRole = await getGCGroupRole({
      group_id: group_id,
      user_id: requester_id,
    });

    if (!requesterRole.length || requesterRole[0].dataValues.role !== "admin") {
      throw new Error("Only admins can remove members from a group");
    }

    // Ensure the user being removed is not the creator
    const userRole = await getGCGroupRole({
      group_id: group_id,
      user_id: user_id,
    });

    if (userRole.length > 0 && userRole[0].dataValues.is_creator) {
      throw new Error("The group creator cannot be removed");
    }

    // Remove member from group
    removeMember = await updateGCGroupMember(
      { is_member: false },
      { group_id, user_id }
    );
    await updateGCGroupRole({ is_active: false }, { group_id, user_id });

    req.response.message = "Member removed from group successfully";
  } catch (error) {
    req.response.data = null;
    req.response.message = error.message;
    req.response.code = 400;
  }
};

module.exports.getGCGroupMemberServ = async (req) => {
  try {
    const Members = await getGCGroupMember(req.body);

    req.response.data = Members;
    req.response.message = "Users retrieved successfully";
  } catch (error) {
    req.response.data = 0;
    req.response.message = error.message;
    req.response.code = 400;
  }
};
