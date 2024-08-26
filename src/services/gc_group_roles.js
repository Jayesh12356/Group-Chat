const {
  getGCGroupRole,
  updateGCGroupRole,
} = require("../repositories/mysql/gc_group_roles");

module.exports.updateGCGroupRoleServ = async (req) => {
  try {
    const { group_id, user_id, new_role, requester_id } = req.body;

    // Basic validation for required fields
    if (!group_id || !user_id || !new_role || !requester_id) {
      throw new Error(
        "Group ID, User ID, New Role, and Requester ID are required"
      );
    }

    // Validate the new role
    const validRoles = ["member", "admin"];
    if (!validRoles.includes(new_role)) {
      throw new Error("Invalid role. Allowed roles are 'member' and 'admin'");
    }

    // Check if the requester is an admin in the group
    const requesterRole = await getGCGroupRole({
      group_id: group_id,
      user_id: requester_id,
      is_active: true,
    });

    if (!requesterRole.length) {
      throw new Error("Requester is not a member of the group");
    }

    if (requesterRole[0].dataValues.role !== "admin") {
      throw new Error("Only admins can change roles");
    }

    // Check if the user being updated is the creator
    const userRole = await getGCGroupRole({
      group_id: group_id,
      user_id: user_id,
      is_active: true,
    });

    if (!userRole.length) {
      throw new Error("The user to be updated is not a member of the group");
    }

    if (userRole[0].dataValues.is_creator) {
      throw new Error("The group creator's role cannot be changed");
    }

    // Update the role
    const updatedRole = await updateGCGroupRole(
      { role: new_role },
      {
        group_id,
        user_id,
      }
    );

    req.response.data = updatedRole;
    req.response.message = "Role updated successfully";
  } catch (error) {
    req.response.data = 0;
    req.response.message = error.message;
    req.response.code = 400;
  }
};
