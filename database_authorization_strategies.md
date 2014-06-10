<link rel="stylesheet" href='markdown_tweaks.css'></link>

<style type="text/css">
  html, body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-image: -webkit-radial-gradient(center,farthest-side circle,hsl(290,80%,50%),hsl(210,80%,50%));
    background-image: radial-gradient(farthest-side circle at center,hsl(290,80%,50%),hsl(210,80%,50%));
  }
</style>



# Keeping data secure within your web-app

Your web-app has a lot of data, and different users can access and modify different bits of that data.

How are you going to handle that issue?

*Is the user authorized to take this action?*

Options:

1. Decide in the browser ... nope!
2. At the route level, before controllers are called
3. Inside the controller / request handler
4. Convenience methods (e.g. on the models) for the controllers to use
5. A layer above the database



# Option 1

If you let your client-side code make important decisions about security ...

you're going to have a bad time.



# Option 2

A request comes in to a route.  Before the request is passed to the controller, our security layer performs a check to see if this request should be allowed.

*Is the user requesting something they are allowed to do?*

Advantages:

- All your security concerns are addressed in one layer.  It makes it clear and easy to audit.
- (It is clear which routes have checks, and for those which do, it should be clear what those checks are.)
- Controllers do not have to worry about security.  Once they are called, they can go ahead and do their work without concern.

Disadvantages:

- The security checks are quite separate from the sensitive actions.
- If a controller is changed/expanded, the developer might forget to update its parent security check.
- Depending on design, the security check may need to perform DB lookups in order to make its decision.  Then the controller may need to perform some of the same queries, in order to perform its task.  This would be inefficient!

Conclusion:

- This might work ok if your routes are very well specified, simple, and unlikely to change.



# Option 3 - Inside the controllers

This is probably the de-facto choice that a web-developer will make.

When processing a request, before taking an action, first check that the action is valid.

    # Only original author or forum moderator can delete a post
    if @post.try(:is_author?, current_user)
       || @post.parent_forum.try(:is_moderator, current_user)
            delete @post
    end

Advantages:

- Logic is close to action.  They can be understood and considered together.

Disadvantages:

- There is a danger of repetition here.  We may be performing similar security checks for different actions.  For example, deleting a post and editing a post might require the same criteria.  This can be addressed by refactoring the decision out into a convenience function.  (In this case 'checkIsAuthorOrModerator' or 'checkCanManipulatePost' depending how you want to express the logic.)
- This is less structured than other approaches.  The security concerns do not appear all in one place, but spread out across the controllers, mixed in with the actions.
- A developer might forget the security check.  Because the check appears inline in the code, a security audit requires looking through the code of every controller, rather than just looking at one security layer.
- We are still accessing DB records directly, we are not forcing the developer to think or code securely.


# Option 4 - Inside the route controller but with a better structure

The idea here is to access database records through a layer that makes it easier to express security checks.

Instead of accessing database records directly, we only allow the developer to access records through one of the authority figures.  (In our example, these are Users and Moderators.)

Functions for accessing sensitive data, or for modifying sensitive data, are made available on the User and Moderator models.

So in order to access a record, or update a record, the developer must call a "convenience" function of the current user.

The convenience functions would only return or modify records if the context user/authority really does have authority to do so.

    current_user.getPrivateMessage(@message_id)

    current_user.getPhoneNumberFor(@friend_id)

    current_user.deletePost(post_id)

Advantages:

- We are still perform security checks in the controller, but they are more neatly encapsulated.
- In fact all the security concerns/rules are specified within the convenience functions, within the models of the entities which hold authority/roles in the system.

Disadvantages:

- The number of convenience functions on the models may grow quite large.
- It will only *force* the developer to code securely if he really doesn't have any other way to access data records.



# Option 5 - A layer of roles and permissions over the database

Data is accessed via the layer.

Entities (users) will have various different roles with respect to a given record.  (For example "author"/"owner", "moderator", "public"/"other")

For each field (column) in a schema (table), permissions are specified to describe which roles have access to read or write to that field for any given record.

When a read or write request is made by a user on a specific record (or when creating a new record):

- The roles that the user has with respect to that record are resolved
- Each involved field is checked to see if one of the roles grants the user with permission to perform the requested operation.
- If all of the conditions are satisfied, the operation is performed, otherwise it is rejected.

Advantages:

- All security concerns are in one layer.  Audits are clear.  Controllers are free to perform their logic, leaving security to be handled elsewhere.
- Permissions can be very fine-grained.  (E.g. per-field read permissions may differ slightly between "moderators" and "authors", or update permissions may differ between "site-wide admins" and "forum moderators".)

Disadvantages:

- Security concerns are entirely separated from the actions which perform them.  This can make it harder to reason about what permissions are actually needed for the app to function!  (Especially in the presence of a large number of different roles, fields, etc.)
- Complexity: It must deal not only with reading and writing fields, but also creating new records and deleting existing records, perhaps based on the forum or comment thread in which they are being added/removed.



# Other concerns - Breaking up tables

It is worth considering breaking up data of different sensitivity levels held for a particular entity into separate tables/schemas.  This is especially important if your framework does not allow partial records to be returned.

For example a user may have public information:

- username
- profile pic
- bio / description

and private information:

- email address
- address, telephone
- hashed password, security question

It is advisable to store these two sets of data in different tables.  The benefits are:

- A vulnerability/leak in one part of the system might not allow access to sensitive data from another area.
- The authority to access sensitive data can be made available to fewer company employees than public data.  This enhances security.
- European law somewhat implies you should take this approach.

In SQL systems you could achieve this using *views* on a single table rather than actually splitting the table into two (which implies redundancy and denormalization).



<!-- Finally -->
<script src='prefixfree.min.js'></script>
<script src='jquery-1.10.2.min.js'></script>
<script src='replace_codes_with_pres.js'></script>
<script src='group_into_slides.js'></script>
<!-- Anything above group_into_slides will end up in a slide; itself in the last one. -->
<script src='reusable_slider.js'></script>
<link rel="stylesheet" href='cube_slider.css'></link>
<script src='cube_slider.js'></script>
<div id='dots'></div>
<link rel="stylesheet" href='dotfield.css'></link>
<script src='dotfield.js'></script>

