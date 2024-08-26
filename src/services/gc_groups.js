const {
  getGCGroup,
  createGCGroup,
  updateGCGroup,
} = require("../repositories/mysql/gc_groups");

const {
  createGCGroupMember,
  updateGCGroupMember,
} = require("../repositories/mysql/gc_group_members");

const { getGCUser } = require("../repositories/mysql/gc_users");

const {
  createGCGroupRole,
  updateGCGroupRole,
} = require("../repositories/mysql/gc_group_roles");

module.exports.createGCGroupServ = async (req) => {
  try {
    const { name, created_by } = req.body;

    // Basic validation
    if (!name || !created_by) {
      throw new Error("Group name and creator ID are required");
    }

    // Check if the creator exists
    const creator = await getGCUser({ id: created_by });
    if (!creator.length) {
      throw new Error("Creator not found");
    }

    // Check if the group name already exists
    const existingGroup = await getGCGroup({ name: name, is_deleted: false });
    if (existingGroup.length) {
      throw new Error("Group name already exists");
    }

    // Create group
    const newGroup = await createGCGroup({
      name,
      created_by,
    });

    await createGCGroupMember({
      group_id: newGroup.id,
      user_id: created_by,
      is_member: true,
    });

    // Assign the creator as the admin with is_creator set to true
    await createGCGroupRole({
      group_id: newGroup.id,
      user_id: created_by,
      role: "admin",
      is_creator: true,
      is_active: true,
    });

    req.response.data = newGroup;
    req.response.message =
      "Group created successfully and creator assigned as admin";
  } catch (error) {
    req.response.data = null;
    req.response.message = error.message;
    req.response.code = 400;
  }
};

module.exports.editGCGroupServ = async (req) => {
  try {
    const { name, id, is_deleted } = req.body;

    // Basic validation
    if (!name) {
      throw new Error("Group name is required");
    }

    // Check if group exists
    const group = await getGCGroup({ id: id });
    if (!group.length) {
      throw new Error("Group not found");
    }

    // Update group
    const updatedGroup = await updateGCGroup(
      { name: name, is_deleted: is_deleted },
      { id: id }
    );

    req.response.data = updatedGroup;
    req.response.message = "Group updated successfully";
  } catch (error) {
    req.response.data = null;
    req.response.message = error.message;
    req.response.code = 400;
  }
};

module.exports.deleteGCGroupServ = async (req) => {
  try {
    const { id } = req.body;

    // Check if group exists
    const group = await getGCGroup({ id: id, is_deleted: false });
    if (!group.length) {
      throw new Error("Group not found");
    }

    // Update group
    const updatedGroup = await updateGCGroup({ is_deleted: true }, { id: id });
    await updateGCGroupMember({ is_member: false }, { group_id: id });

    await updateGCGroupRole({ is_active: false }, { group_id: id });

    req.response.data = updatedGroup;
    req.response.message = "Group deleted successfully";
  } catch (error) {
    req.response.data = null;
    req.response.message = error.message;
    req.response.code = 400;
  }
};

module.exports.searchGCGroupServ = async (req) => {
  try {
    const groups = await getGCGroup(req.body);

    req.response.data = groups;
    req.response.message = "Groups retrieved successfully";
  } catch (error) {
    req.response.data = 0;
    req.response.message = error.message;
    req.response.code = 400;
  }
};
