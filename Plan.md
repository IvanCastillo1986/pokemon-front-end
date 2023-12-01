ToDo

When user visits Play page, populate myItems with items in context User{}'s currentItems[]

When user clicks on Item menu, it displays the items in myItems

When the user clicks on item, it prompts them if they'd like to use it.

If they use it, it removes the item from myItems.

After the match ends, make call to put.users to adjust the bags table items. 
    For items that were used, make a Delete query.
    For new item that was won, make a Post query.
    The User{} context and sessionStorage are updated with new/removed items as well.

