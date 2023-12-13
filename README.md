# Power of Attorney

This assignment is an example application to demonstrate the use
of Power of Attorney for internal employees.

# Installation

Refer to [INSTALL.md](INSTALL.md) for installation instructions.

# Assignment details

## Background

A Power of Attorney is used when someone (grantor) wants to give access to his/her account(‘s) to someone else (grantee). This could be read access or write access. In this way the grantee can read/write in the grantors account. Notice that this is a simplified version of reality. An employee will facilitate doing this task for the customer. In the following business requirements, we want to create the first screen an employee gets to see in the Power of Attorney creation process.

## Assignment

### Business Requirement:

The employee needs to select the customers, to create a power of attorney.

1. Customer Search - Employee must be able to search a customer based on the (postal code and a house number) or name and list all customers with their basic information (name, address, etc).

- The search is performed on the backend side. The frontend will pass the criteria and handle the response from the backend. (no backend work needed, use a static file to simulate the response)

2. Employee Details - Employee must be able to click on one of the results and the details of the selected customer will be shown replacing the search results.

### Bonus tasks

These requirements are not mandatory to complete the assignment. If there’s time left, you can implement these functionalities

- Cancel customer selection - Employee should be able to cancel the customer selection and select another customer from the previous search results.

- Sortable table - Employee should be able to sort the table as I wish.
