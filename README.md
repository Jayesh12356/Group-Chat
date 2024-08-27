
## How to Run the Application

Follow these steps to set up and run the Group Chat application:

1. **Create the Database:**
   - Use all the `CREATE` statements provided in the `ALL_DATABASE_CREATE_QUERIES` file to set up the database. You can execute these queries in any MySQL setup.

2. **Configure Database Connection:**
   - Once your database is created, update the database connection settings in the `config->data->config.json` file to match your MySQL connection details.

3. **Refer to Data Dump (Optional):**
   - For initial data population, you can refer to the `ALL_TABLES_DATA_EXCEL_DUMP` file.

4. **Set Up Redis:**
   - Make sure you have a local Redis server running, as user sessions for login/logout are managed through Redis. You can start the Redis server by running the following command in the command line:
     ```bash
     redis-server.exe
     ```

5. **Run the Application:**
   - Once you have properly configured your MySQL database and Redis server, start the application by running:
     ```bash
     npm start
     ```

6. **Server Logs:**
   - Look for the following logs to confirm that the server is up and running:
     ```
     Running on port 8002
     connected to database
     ```

7. **Testing Endpoints:**
   - To test all the endpoints, import the `Group_Chat.postman_collection.json` file into Postman. This collection contains all the API endpoints, allowing you to interact with and test the entire group chat application.


## Overview of Group Chat User Service File

This file implements the core user-related functionalities of the group chat application. It includes services for creating, editing, logging in, logging out, and checking the login status of users. Additionally, it utilizes Redis for session management, ensuring efficient storage and retrieval of session-related data.

### 1. `createGCUserServ` Function

**Purpose:**  
This function handles the creation of a new user account.

**Input:**  
- `req.body` containing:
  - `username` (string): Username for the new user. *(Required)*
  - `password` (string): Password for the new user. *(Required)*
  - `email` (string): Email address of the user. *(Optional)*
  - `name` (string): Full name of the user. *(Required)*
  - `contact_number` (string): Contact number of the user. *(Optional)*

**Process:**
1. **Validation:** Checks if `username`, `password`, and `name` are provided. Throws an error if any of these fields are missing.
2. **Existing User Check:** Uses `getGCUser` to check if a user with the given `username` already exists. Throws an error if the user exists.
3. **Password Hashing:** Uses Argon2 to hash the provided password for security.
4. **User Creation:** Calls `createGCUser` to create a new user in the database with the hashed password and other provided details.
5. **Response:** Sets a success message in `req.response.message` and includes the created user's data in `req.response.data`.

**Output:**  
- On success: `req.response.data` contains the new user data, and `req.response.message` is set to "User created successfully."
- On failure: `req.response.message` contains the error message, and `req.response.code` is set to 400.

### 2. `editGCUserServ` Function

**Purpose:**  
This function updates the details of an existing user.

**Input:**  
- `req.body` containing:
  - `id` (number): User ID of the user to update. *(Required)*
  - `username` (string): New username. *(Optional)*
  - `password` (string): New password. *(Optional)*
  - `email` (string): New email address. *(Optional)*
  - `name` (string): New full name. *(Optional)*
  - `contact_number` (string): New contact number. *(Optional)*

**Process:**
1. **Validation:** Checks if `id` is provided. Throws an error if missing.
2. **User Existence Check:** Uses `getGCUser` to verify if a user with the provided `id` exists. Throws an error if the user does not exist.
3. **Prepare Update Data:** Constructs an `updateData` object with the fields to be updated.
4. **Password Hashing:** If a new password is provided, it is hashed using Argon2.
5. **Update User:** Calls `updateGCUser` to update the user details in the database.
6. **Response:** Sets a success message in `req.response.message` and includes the updated user data in `req.response.data`.

**Output:**  
- On success: `req.response.data` contains the updated user data, and `req.response.message` is set to "User updated successfully."
- On failure: `req.response.message` contains the error message, and `req.response.code` is set to 400.

### 3. `loginGCUserServ` Function

**Purpose:**  
This function manages user login.

**Input:**  
- `req.body` containing:
  - `username` (string): Username of the user trying to log in. *(Required)*
  - `password` (string): Password of the user. *(Required)*

**Process:**
1. **Validation:** Checks if `username` and `password` are provided. Throws an error if any are missing.
2. **User Existence Check:** Uses `getGCUser` to find a user with the provided `username`. Throws an error if the user does not exist.
3. **Password Verification:** Uses Argon2 to verify the provided password against the stored hashed password. Throws an error if passwords do not match.
4. **Session Management:** Calls `setToken` to store the user's session token in Redis.
5. **Response:** Sets a success message in `req.response.message`.

**Output:**  
- On success: `req.response.message` is set to "Login successful."
- On failure: `req.response.message` contains the error message, and `req.response.code` is set to 400.

### 4. `logoutGCUserServ` Function

**Purpose:**  
This function handles user logout.

**Input:**  
- `req.body` containing:
  - `username` (string): Username of the user to log out. *(Required)*

**Process:**
1. **Session Termination:** Calls `deleteToken` to remove the user's session token from Redis.
2. **Response:** Sets a success message in `req.response.message`.

**Output:**  
- On success: `req.response.message` is set to "Logout successful."
- On failure: `req.response.message` contains the error message, and `req.response.code` is set to 400.

### 5. `isLoggedInServ` Function

**Purpose:**  
This function checks if a user is currently logged in.

**Input:**  
- `req.body` containing:
  - `username` (string): Username of the user to check. *(Required)*

**Process:**
1. **Session Check:** Calls `getToken` to check if a session token exists for the given `username` in Redis.
2. **Response:** Sets `req.response.data` to `{ isLoggedIn: true }` if a token is found, otherwise `{ isLoggedIn: false }`.

**Output:**  
- On success: `req.response.data` contains `{ isLoggedIn: true }` or `{ isLoggedIn: false }`.
- On failure: `req.response.message` contains the error message, and `req.response.code` is set to 400.

### 6. `getAllGCUsersServ` Function

**Purpose:**  
This function retrieves a list of all users.

**Input:**  
- `req.body` can contain filters for retrieving users. *(Optional)*

**Process:**
1. **Retrieve Users:** Calls `getGCUser` with the provided filters to retrieve user data from the database.
2. **Response:** Sets `req.response.data` with the list of users and a success message in `req.response.message`.

**Output:**  
- On success: `req.response.data` contains the list of users, and `req.response.message` is set to "Users retrieved successfully."
- On failure: `req.response.message` contains the error message, and `req.response.code` is set to 400.

### Redis Functions

**Purpose:**  
These functions manage session tokens using Redis to handle user authentication and session management efficiently.

- **`connectRedis()`**: Establishes a connection to the Redis server.
- **`setToken(tokenKey)`**: Sets a session token in Redis with a given `tokenKey`. The value is set to `"1"` indicating an active session.
- **`getToken(tokenKey)`**: Retrieves a session token from Redis using `tokenKey`. Returns parsed data to check if the user is logged in.
- **`deleteToken(tokenKey)`**: Deletes a session token from Redis using `tokenKey`, effectively logging out the user.

### Conclusion

This file implements crucial user management functionalities for the group chat application, including account creation, user updates, login, logout, session checking, and user retrieval. The use of Argon2 for password hashing ensures security, while Redis provides efficient session management. This structured approach ensures that user interactions are handled smoothly, with error handling to manage various scenarios, enhancing the robustness and security of the application.






## Overview of Group Chat Group Service File

This file is responsible for managing group-related functionalities within the group chat application. It includes services for creating, editing, deleting, and searching groups. The functions ensure that groups are created with valid creators and that proper roles are assigned to group members.

### 1. `createGCGroupServ` Function

**Purpose:**  
This function handles the creation of a new group.

**Input:**  
- `req.body` containing:
  - `name` (string): The name of the new group. *(Required)*
  - `created_by` (number): The user ID of the creator of the group. *(Required)*

**Process:**
1. **Validation:** Checks if `name` and `created_by` are provided. Throws an error if any of these fields are missing.
2. **Creator Existence Check:** Uses `getGCUser` to verify if a user with the given `created_by` ID exists. Throws an error if the user does not exist.
3. **Group Name Check:** Uses `getGCGroup` to check if a group with the provided `name` already exists and is not deleted. Throws an error if a group with the same name exists.
4. **Group Creation:** Calls `createGCGroup` to create a new group in the database.
5. **Assign Creator as Member:** Calls `createGCGroupMember` to add the creator to the group as a member.
6. **Assign Creator as Admin:** Calls `createGCGroupRole` to assign the creator as an admin and mark them as the creator of the group.
7. **Response:** Sets a success message in `req.response.message` and includes the created group's data in `req.response.data`.

**Output:**  
- On success: `req.response.data` contains the new group data, and `req.response.message` is set to "Group created successfully and creator assigned as admin."
- On failure: `req.response.message` contains the error message, and `req.response.code` is set to 400.

### 2. `editGCGroupServ` Function

**Purpose:**  
This function updates the details of an existing group.

**Input:**  
- `req.body` containing:
  - `name` (string): New name for the group. *(Required)*
  - `id` (number): Group ID of the group to update. *(Optional)*
  - `is_deleted` (boolean): Flag to mark the group as deleted. *(Optional)*

**Process:**
1. **Validation:** Checks if `name` is provided. Throws an error if missing.
2. **Group Existence Check:** Uses `getGCGroup` to verify if a group with the provided `id` exists. Throws an error if the group does not exist.
3. **Update Group:** Calls `updateGCGroup` to update the group's details in the database.
4. **Response:** Sets a success message in `req.response.message` and includes the updated group data in `req.response.data`.

**Output:**  
- On success: `req.response.data` contains the updated group data, and `req.response.message` is set to "Group updated successfully."
- On failure: `req.response.message` contains the error message, and `req.response.code` is set to 400.

### 3. `deleteGCGroupServ` Function

**Purpose:**  
This function handles the deletion of a group.

**Input:**  
- `req.body` containing:
  - `id` (number): Group ID of the group to delete. *(Required)*

**Process:**
1. **Group Existence Check:** Uses `getGCGroup` to verify if a group with the provided `id` exists and is not already marked as deleted. Throws an error if the group does not exist.
2. **Mark Group as Deleted:** Calls `updateGCGroup` to mark the group as deleted by setting `is_deleted` to `true`.
3. **Update Group Members:** Calls `updateGCGroupMember` to mark all members as not part of the group.
4. **Update Group Roles:** Calls `updateGCGroupRole` to deactivate all roles associated with the group.
5. **Response:** Sets a success message in `req.response.message` and includes the updated group data in `req.response.data`.

**Output:**  
- On success: `req.response.data` contains the updated group data, and `req.response.message` is set to "Group deleted successfully."
- On failure: `req.response.message` contains the error message, and `req.response.code` is set to 400.

### 4. `searchGCGroupServ` Function

**Purpose:**  
This function retrieves a list of groups based on the provided search criteria.

**Input:**  
- `req.body` containing filters for retrieving groups. *(Optional)*

**Process:**
1. **Retrieve Groups:** Calls `getGCGroup` with the provided filters to retrieve group data from the database.
2. **Response:** Sets `req.response.data` with the list of groups and a success message in `req.response.message`.

**Output:**  
- On success: `req.response.data` contains the list of groups, and `req.response.message` is set to "Groups retrieved successfully."
- On failure: `req.response.message` contains the error message, and `req.response.code` is set to 400.

### Conclusion

This file implements the core functionalities related to managing groups within the group chat application. It provides services for creating new groups, updating group details, deleting groups, and searching for groups based on various criteria. Each function includes proper validation checks and error handling to ensure the smooth and secure management of groups. The inclusion of assigning roles and managing group memberships enhances the control over group interactions and user roles, making the application robust and user-friendly.






## Overview of Group Chat Group Member Service File

This file is responsible for managing members of groups within the group chat application. It includes services for adding members to groups, removing members from groups, and retrieving group members. Each function includes validation checks and role-based access control to ensure proper group management.

### 1. `addGCGroupMemberServ` Function

**Purpose:**  
This function handles adding a new member to a specified group.

**Input:**  
- `req.body` containing:
  - `group_id` (number): The ID of the group to which the member will be added. *(Required)*
  - `user_id` (number): The ID of the user to be added to the group. *(Required)*
  - `requester_id` (number): The ID of the user requesting to add the new member (must be an admin). *(Required)*
  - `role` (string): The role to be assigned to the new member (default is "member"). *(Optional)*

**Process:**
1. **Validation:** Checks if `group_id`, `user_id`, and `requester_id` are provided. Throws an error if any of these fields are missing.
2. **User Existence Check:** Uses `getGCUser` to verify if the user to be added (`user_id`) exists. Throws an error if the user does not exist.
3. **Requester Existence Check:** Uses `getGCUser` to verify if the requester (`requester_id`) exists. Throws an error if the requester does not exist.
4. **Group Existence Check:** Uses `getGCGroup` to check if the group exists and is not deleted. Throws an error if the group does not exist.
5. **Admin Check:** Uses `getGCGroupRole` to verify if the requester is an admin of the group. Throws an error if the requester is not an admin.
6. **Duplicate Member Check:** Uses `getGCGroupMember` to check if the user is already an active member of the group. Throws an error if the user is already a member.
7. **Reactivating a Kicked Member:** If the user was previously removed (`is_member: false`), they are reactivated by calling `updateGCGroupMember` and `updateGCGroupRole`.
8. **Add New Member:** If the user is not a reactivated member, `createGCGroupMember` and `createGCGroupRole` are called to add the user as a new member with the specified role.
9. **Response:** Sets a success message in `req.response.message`.

**Output:**  
- On success: `req.response.message` is set to "Member added to group successfully."
- On failure: `req.response.message` contains the error message, and `req.response.code` is set to 400.

### 2. `removeGCGroupMemberServ` Function

**Purpose:**  
This function handles removing a member from a specified group.

**Input:**  
- `req.body` containing:
  - `group_id` (number): The ID of the group from which the member will be removed. *(Required)*
  - `user_id` (number): The ID of the user to be removed from the group. *(Required)*
  - `requester_id` (number): The ID of the user requesting the removal (must be an admin). *(Required)*

**Process:**
1. **Validation:** Checks if `group_id`, `user_id`, and `requester_id` are provided. Throws an error if any of these fields are missing.
2. **User Existence Check:** Uses `getGCUser` to verify if the user to be removed (`user_id`) exists. Throws an error if the user does not exist.
3. **Requester Existence Check:** Uses `getGCUser` to verify if the requester (`requester_id`) exists. Throws an error if the requester does not exist.
4. **Group Existence Check:** Uses `getGCGroup` to check if the group exists and is not deleted. Throws an error if the group does not exist.
5. **Admin Check:** Uses `getGCGroupRole` to verify if the requester is an admin of the group. Throws an error if the requester is not an admin.
6. **Creator Removal Check:** Uses `getGCGroupRole` to check if the user being removed is the creator of the group. Throws an error if the user is the creator, as creators cannot be removed.
7. **Remove Member:** Calls `updateGCGroupMember` and `updateGCGroupRole` to mark the user as not a member (`is_member: false`) and deactivate their role (`is_active: false`).
8. **Response:** Sets a success message in `req.response.message`.

**Output:**  
- On success: `req.response.message` is set to "Member removed from group successfully."
- On failure: `req.response.message` contains the error message, and `req.response.code` is set to 400.

### 3. `getGCGroupMemberServ` Function

**Purpose:**  
This function retrieves the list of members for a specified group or based on other filters provided in the request.

**Input:**  
- `req.body` containing filters to retrieve group members. *(Optional)*

**Process:**
1. **Retrieve Members:** Calls `getGCGroupMember` with the provided filters to retrieve members of the group from the database.
2. **Response:** Sets `req.response.data` with the list of members and a success message in `req.response.message`.

**Output:**  
- On success: `req.response.data` contains the list of group members, and `req.response.message` is set to "Users retrieved successfully."
- On failure: `req.response.message` contains the error message, and `req.response.code` is set to 400.

### Conclusion

This file implements the essential functionalities related to managing group members in the group chat application. It includes adding members to groups, ensuring only admins can add or remove members, and providing a mechanism to retrieve group members. These functions enhance the application's capability to manage group dynamics effectively and enforce role-based access control for security and proper group management.






## Overview of Group Chat Group Role Update Service File

This file is focused on updating the roles of members within a group in the group chat application. It ensures that only authorized users can change roles and that specific constraints are adhered to, such as the immutability of the group creator's role.

### `updateGCGroupRoleServ` Function

**Purpose:**  
This function updates the role of a specified user in a particular group. It ensures that only admins can change user roles and that certain roles, such as the creator's, cannot be altered.

**Input:**  
- `req.body` containing:
  - `group_id` (number): The ID of the group where the user's role is being updated. *(Required)*
  - `user_id` (number): The ID of the user whose role is to be updated. *(Required)*
  - `new_role` (string): The new role to be assigned to the user. Acceptable values are "member" and "admin". *(Required)*
  - `requester_id` (number): The ID of the user requesting the role change. *(Required)*

**Process:**
1. **Validation of Required Fields:**  
   Checks if `group_id`, `user_id`, `new_role`, and `requester_id` are provided. If any of these fields are missing, it throws an error with a message indicating the missing field(s).

2. **Role Validation:**  
   Ensures that `new_role` is either "member" or "admin". If it is not one of these values, it throws an error stating that only "member" and "admin" roles are allowed.

3. **Requester Admin Check:**  
   Calls `getGCGroupRole` to verify if the `requester_id` belongs to an active admin in the group (`group_id`). If the requester is not an admin or not a member of the group, it throws an error stating that only admins can change roles.

4. **User Membership and Creator Check:**  
   Calls `getGCGroupRole` to verify if the `user_id` belongs to an active member of the group. If the user is not a member, it throws an error. It also checks if the user is the creator of the group. If the user is the creator, it throws an error stating that the creator's role cannot be changed.

5. **Role Update:**  
   Calls `updateGCGroupRole` to update the user's role in the group to the `new_role` specified in the input. The update is done only if all the above checks are passed successfully.

6. **Response:**  
   - On successful role update, sets `req.response.data` with the updated role details and a success message in `req.response.message`.
   - On error, sets `req.response.data` to 0, `req.response.message` to the error message, and `req.response.code` to 400.

**Output:**  
- **Success:**  
  - `req.response.data`: Contains the details of the updated role.
  - `req.response.message`: "Role updated successfully."

- **Failure:**  
  - `req.response.data`: Set to 0.
  - `req.response.message`: Contains the error message.
  - `req.response.code`: Set to 400.

### Conclusion

This file ensures robust role management within the group chat application by enforcing role-based access control. By allowing only admins to update roles and preventing changes to the creator's role, it maintains the integrity and hierarchical structure of group management. These functionalities are essential for maintaining order and security within group-based applications.






## Overview of Group Chat Message Service File

This file is responsible for handling message-related operations in the group chat application, including sending, editing, deleting messages, retrieving group messages, and fetching message reactions.

### `sendGCMessageServ` Function

**Purpose:**  
This function sends a message in a specified group. It validates the input, checks if the user belongs to the group, and then creates the message.

**Input:**  
- `req.body` containing:
  - `group_id` (number): The ID of the group where the message is being sent. *(Required)*
  - `user_id` (number): The ID of the user sending the message. *(Required)*
  - `message` (string): The content of the message. *(Required)*

**Process:**
1. **Validation of Required Fields:**  
   Checks if `group_id`, `user_id`, and `message` are provided. If any of these fields are missing, it throws an error with a message indicating the missing field(s).

2. **User and Group Validation:**  
   - Calls `getGCUser` to verify if the `user_id` exists.
   - Calls `getGCGroup` to check if the `group_id` exists.
   - Calls `getGCGroupMember` to ensure that the `user_id` is a member of the group.

3. **Send Message:**  
   Calls `createGCMessage` to create and save the message in the group.

4. **Response:**  
   - On successful message creation, sets `req.response.data` with the new message details and a success message in `req.response.message`.
   - On error, sets `req.response.data` to `null`, `req.response.message` to the error message, and `req.response.code` to 400.

**Output:**  
- **Success:**  
  - `req.response.data`: Contains the details of the new message.
  - `req.response.message`: "Message sent successfully."

- **Failure:**  
  - `req.response.data`: Set to `null`.
  - `req.response.message`: Contains the error message.
  - `req.response.code`: Set to 400.

### `editGCMessageServ` Function

**Purpose:**  
This function edits a specific message sent by a user. It checks if the message belongs to the user and is not deleted, then updates the message content.

**Input:**  
- `req.body` containing:
  - `message_id` (number): The ID of the message to be edited. *(Required)*
  - `user_id` (number): The ID of the user editing the message. *(Required)*
  - `message` (string): The new content for the message. *(Required)*

**Process:**
1. **Validation of Required Fields:**  
   Checks if `message_id`, `user_id`, and `message` are provided. If any of these fields are missing, it throws an error.

2. **Message and User Validation:**  
   Calls `getGCMessage` to verify if the message exists, belongs to the user, and is not deleted.

3. **Update Message:**  
   Calls `updateGCMessage` to update the message content.

4. **Response:**  
   - On successful update, sets `req.response.data` with the updated message details and a success message in `req.response.message`.
   - On error, sets `req.response.data` to `null`, `req.response.message` to the error message, and `req.response.code` to 400.

**Output:**  
- **Success:**  
  - `req.response.data`: Contains the details of the updated message.
  - `req.response.message`: "Message updated successfully."

- **Failure:**  
  - `req.response.data`: Set to `null`.
  - `req.response.message`: Contains the error message.
  - `req.response.code`: Set to 400.

### `deleteGCMessageServ` Function

**Purpose:**  
This function deletes a specified message. It checks if the message belongs to the user and is not already deleted, then marks the message as deleted.

**Input:**  
- `req.body` containing:
  - `message_id` (number): The ID of the message to be deleted. *(Required)*
  - `user_id` (number): The ID of the user attempting to delete the message. *(Required)*

**Process:**
1. **Validation of Required Fields:**  
   Checks if `message_id` and `user_id` are provided. If any of these fields are missing, it throws an error.

2. **Message Validation:**  
   Calls `getGCMessage` to verify if the message exists, belongs to the user, and is not deleted.

3. **Delete Message:**  
   - Calls `updateGCMessage` to mark the message as deleted.
   - Calls `updateGCLike` to delete associated likes.

4. **Response:**  
   - On successful deletion, sets `req.response.message` to "Message deleted successfully."
   - On error, sets `req.response.data` to `null`, `req.response.message` to the error message, and `req.response.code` to 400.

**Output:**  
- **Success:**  
  - `req.response.data`: Set to `null`.
  - `req.response.message`: "Message deleted successfully."

- **Failure:**  
  - `req.response.data`: Set to `null`.
  - `req.response.message`: Contains the error message.
  - `req.response.code`: Set to 400.

### `getGCGroupMessagesServ` Function

**Purpose:**  
This function retrieves all messages in a specified group.

**Input:**  
- `req.body` containing:
  - `group_id` (number): The ID of the group from which to retrieve messages. *(Required)*

**Process:**
1. **Group Validation:**  
   Calls `getGCGroup` to ensure the group exists.

2. **Retrieve Messages:**  
   Calls `getGCMessage` to fetch all messages associated with the `group_id`.

3. **Response:**  
   - On successful retrieval, sets `req.response.data` with the messages and a success message in `req.response.message`.
   - On error, sets `req.response.data` to 0, `req.response.message` to the error message, and `req.response.code` to 400.

**Output:**  
- **Success:**  
  - `req.response.data`: Contains the list of messages in the group.
  - `req.response.message`: "Messages retrieved successfully."

- **Failure:**  
  - `req.response.data`: Set to 0.
  - `req.response.message`: Contains the error message.
  - `req.response.code`: Set to 400.

### `getGCMessageReactionsServ` Function

**Purpose:**  
This function retrieves reactions for a specific message.

**Input:**  
- `req.body` containing:
  - `message_id` (number): The ID of the message for which to retrieve reactions. *(Required)*

**Process:**
1. **Message Validation:**  
   Calls `getGCMessage` to ensure the message exists.

2. **Retrieve Reactions:**  
   Calls `getGCMessageReactions` to fetch reactions associated with the `message_id`.

3. **Response:**  
   - On successful retrieval, sets `req.response.data` with the reactions and a success message in `req.response.message`.
   - On error, sets `req.response.data` to 0, `req.response.message` to the error message, and `req.response.code` to 400.

**Output:**  
- **Success:**  
  - `req.response.data`: Contains the list of reactions for the message.
  - `req.response.message`: "Reactions retrieved successfully."

- **Failure:**  
  - `req.response.data`: Set to 0.
  - `req.response.message`: Contains the error message.
  - `req.response.code`: Set to 400.

### Conclusion

This file provides essential services for managing messages and reactions within the group chat application. It ensures that messages are handled securely, with appropriate validations to maintain integrity and consistency. These functionalities are crucial for creating a reliable and user-friendly group chat experience.






## Overview of React to Message Service File

This file contains the service function responsible for handling user reactions to messages within the group chat application. It performs necessary validations, checks if the message and user exist, and then processes the reaction.

### `reactToMessageServ` Function

**Purpose:**  
This function allows users to react to a specific message in a group chat. It validates the input, checks the existence of the user and message, and then adds the reaction.

**Input:**  
- `req.body` containing:
  - `message_id` (number): The ID of the message to which the user is reacting. *(Required)*
  - `user_id` (number): The ID of the user who is reacting to the message. *(Required)*
  - `reaction_type` (string): The type of reaction being added (e.g., "like", "love", "laugh", "sad", "angry"). *(Required)*

**Process:**
1. **Validation of Required Fields:**  
   Checks if `message_id`, `user_id`, and `reaction_type` are provided. If any of these fields are missing, it throws an error indicating the missing field(s).

2. **Validation of Reaction Type:**  
   Validates the `reaction_type` against a list of allowed reactions: `["like", "love", "laugh", "sad", "angry"]`. If the reaction type is not in this list, it throws an error with the message "Invalid reaction type."

3. **User Validation:**  
   Calls `getGCUser` to verify if the `user_id` exists. If the user does not exist, it throws an error with the message "User not found."

4. **Message Validation:**  
   Calls `getGCMessage` to check if the message exists and is not deleted. If the message does not exist or is marked as deleted, it throws an error with the message "Message not found."

5. **Add Reaction:**  
   If all validations pass, it calls `createGCLike` to create a new reaction associated with the message and user.

6. **Response:**  
   - On successful reaction creation, sets `req.response.data` with the details of the new reaction and a success message in `req.response.message`.
   - On error, sets `req.response.data` to `null`, `req.response.message` to the error message, and `req.response.code` to 400.

**Output:**  
- **Success:**  
  - `req.response.data`: Contains the details of the new reaction (e.g., `message_id`, `user_id`, `reaction_type`).
  - `req.response.message`: "Reaction added successfully."

- **Failure:**  
  - `req.response.data`: Set to `null`.
  - `req.response.message`: Contains the error message.
  - `req.response.code`: Set to 400.

### Conclusion

The `reactToMessageServ` function plays a vital role in managing user interactions within the group chat application. By handling reactions, it adds an additional layer of user engagement, allowing users to express their feelings or thoughts about specific messages. The function performs thorough validation to ensure that only valid reactions are added by existing users to existing messages, maintaining the integrity of the chat experience.

This documentation provides an overview of how the function works, making it easier for developers to understand and maintain the reaction-related functionalities in the group chat application.





### Future Enhancements for Group Chat Application

Enhancing the group chat application can significantly improve user experience and maintain data integrity and privacy. Here are some potential features to consider for future development:

1. **Batch User Addition**
   - **Description**: Implement a feature that allows admins to add multiple users to a group simultaneously, rather than one at a time.
   - **Benefits**:
     - Streamlines the process of adding users, saving time for group admins.
     - Facilitates faster group setup, especially useful for large teams or organizations.

2. **Undo Delete for Messages**
   - **Description**: Allow users to undo a delete action on messages for a short window (e.g., 5 minutes) after deletion.
   - **Benefits**:
     - Prevents accidental loss of important information.
     - Provides users with flexibility and a sense of control over their messages.
     - Ensures the consistency of conversation by allowing corrections.

3. **Scheduled Messages**
   - **Description**: Enable users to schedule messages to be sent at a later time or date.
   - **Benefits**:
     - Allows users to plan and coordinate messages for optimal timing.
     - Useful for reminders, announcements, and managing time-sensitive communications.

4. **Threaded Conversations**
   - **Description**: Implement threaded conversations, allowing users to reply directly to specific messages, creating sub-conversations within a group chat.
   - **Benefits**:
     - Improves readability and organization of group chats.
     - Helps maintain the context of discussions, especially in busy groups.

5. **Read Receipts and Message Status Indicators**
   - **Description**: Add read receipts and indicators (e.g., delivered, read) to messages.
   - **Benefits**:
     - Enhances communication by providing feedback on message status.
     - Increases engagement and response rates by letting users know when their messages have been read.

6. **Advanced Search and Filter Options**
   - **Description**: Develop advanced search and filter functionalities within groups, allowing users to search by keywords, date ranges, sender, etc.
   - **Benefits**:
     - Facilitates quick retrieval of important information.
     - Improves user experience by making navigation within group chats more efficient.

7. **Message Pinning**
   - **Description**: Allow users, especially admins, to pin important messages at the top of a group chat.
   - **Benefits**:
     - Keeps critical information easily accessible.
     - Ensures all group members are aware of key updates and announcements.

8. **End-to-End Encryption**
   - **Description**: Implement end-to-end encryption to secure all group chat messages and data.
   - **Benefits**:
     - Ensures the privacy and security of user communications.
     - Builds trust among users by safeguarding sensitive information.

9. **Two-Factor Authentication (2FA)**
   - **Description**: Add a two-factor authentication feature for user accounts.
   - **Benefits**:
     - Enhances account security, protecting against unauthorized access.
     - Provides an additional layer of security for sensitive group communications.

10. **Data Analytics Dashboard for Admins**
    - **Description**: Create a dashboard that provides analytics on user engagement, group activity, and message statistics.
    - **Benefits**:
      - Offers insights into group dynamics and user participation.
      - Helps admins make informed decisions to improve group interaction and engagement.

11. **Localization and Multi-Language Support**
    - **Description**: Introduce support for multiple languages, allowing users to choose their preferred language.
    - **Benefits**:
      - Expands the application's accessibility to a global audience.
      - Enhances user experience by providing content in the user's native language.

12. **Integration with External Services**
    - **Description**: Enable integration with third-party services like calendars, task management tools, or file storage systems.
    - **Benefits**:
      - Increases the application’s utility by connecting with other tools.
      - Allows for seamless data sharing and collaboration within the group.

### Conclusion

These future enhancements will significantly improve user experience, facilitate better communication, and ensure data privacy and integrity. By continuously evolving the application, we can better meet user needs and adapt to changing requirements in the digital communication space.
