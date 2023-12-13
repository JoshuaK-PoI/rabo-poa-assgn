# Addendum

While developing the application, some of the business requirements were not entirely clear. I assume the assignment does not require the discussion of the business requirements. To make my intentions clear, and to show how I would approach discussing business requirements, I have added this addendum.

Business requirements are taken from the assignment itself, depicted as quotes.

The questions are actual questions I would ask a product owner.

The answers given are my own, role-playing as a product owner. I have not discussed the business requirements with anyone.

Additionally, a reference is added to show my thought process, or weighing benefits and drawbacks of a certain approach.

## Business Requirements:

> Employee must be able to search a customer based on the (postal code and a house number) or name

Q: Would this be a single search box covering both cases, or two separate search boxes?

A: Use a single search box to cover both cases. The customer wants the easiest possible way to search for a customer.

Ref:
Using a single search box is the easiest and most flexible way to search for a customer. The user can search for a customer by name, postal code, house number, or a combination of these. However, this approach may not work if the employee wants to filter on both name and postal code, depending on how the backend and database may interpret the search query. In that case, two separate search boxes would be more appropriate.

> and list all customers with their basic information (name, address, etc).

Q: Should customers be shown when the search box is empty? I.e. when the page is first opened?

A: Yes, all customers should be shown when the page is first opened.

Ref: The 'and' in the requirement does not make clear whether it is a continuation of the 'search' requirement, or if it is a requirement separate from the search. I have assumed this to mean that all customers should be shown when the page is first opened.

> the details of the selected customer will be shown replacing the search results.

Q: Are there any details that should not be shown?

A: No, all details should be shown.

Ref: Regarding security and access rights, the employee should only be able to see the details of the customer he/she is allowed to. However, this is not part of the assignment, so all details should be shown.

> the details of the selected customer will be shown replacing the search results.

Q: Does the information need to be shown on a separate page, or in a modal?

A: The information should be shown on a separate page.

Ref: Going by the 'replacing the search results' part of the requirement, the information should be shown on a separate page. Depending on customer intentions and desires, both approaches could be valid.
