# Iteration 2 Retrospective

**Project Name:** Recipeat  
**Date:** Wed Oct 30  
**Team Members:**  
- Jaden Chan - 301545137  
- Asfand Khan - 301605890  
- Raakin Shabbir - 301555190  
- Abrar Rahman - 301401426  
- Javier Sy Quia - 301564151  

## 1. Overview of Iteration 2
For iteration 2, we mainly focused on refining our current functional requirements and features to enhance the user experience. We also added a new feature of a “Recipe of the Day” and worked on our Liked Recipe feature that was intended for the previous iteration. Our goal for this iteration was to improve UI and make some features more visually appealing. A significant portion of work in this iteration was spent on figuring out how to use the API for retrieving recipes (instead of doing it manually) and integrating it with our application. We utilized theMealDB's API to gather all the information about each meal and displayed it on our swiper page. We updated the logic of the swiper page to follow a similar interface to Tinder, allowing users to move to the next page regardless of whether they swiped left or right.

## 2. Feature Tracking
The team continued using Jira and principles from the Kanban software framework to track issues and assign features to team members. From the previous iteration, the team found great value in combining the Scrum framework with the Kanban format.
![image](https://github.com/user-attachments/assets/4ede5c65-156a-460e-b5c1-1acec7b11a5b)
  
  
## 3.Testing
- **Recipe of the Day:**
![image](https://github.com/user-attachments/assets/f67b72b9-00e8-432c-969d-d85275fb8607)

- **Liked Recipes:**

## 4. New Features
- **Feature Implementation:** The team began implementing and improving the following functional requirements for iteration 2:
  - **Recipe of the Day Page:** Displayed a recipe of the day to engage users, along with a button to refresh for more exploration.
  - **Swiping Recipes:** Users could now swipe through a larger batch of recipes using a Tinder-like logic, preventing backtracking after swiping.
  - **Liked Recipes:** The Liked Recipes feature now functions as intended, allowing users to view their liked recipes and related information in the liked recipes tab.

## 5. What Went Well?
- The team effectively collaborated to discuss which functional requirements to add or improve.
- Completed previously intended features that enhance the overall implementation of the app.
- Continued to develop teamwork skills and knowledge around the MVC environment and developer tools, Git and GitHub.

## 6. Challenges Encountered
- Implementing the Liked Recipes feature was challenging due to extensive debugging and integration with the backend.
- Handling merge conflicts was time-consuming since some features required multiple team members to work on the same code.
- Setting up the API took longer than anticipated. The team agreed that it would have been more effective to implement this as a first step and build from there.

## 7. Areas for Improvement
New areas for improvement include:
  - Creating a more cohesive aesthetic for the app and enhancing visual appeal.
  - Fixing the swiper page logic to properly like and delete recipes, eliminating bugs.
  - Refreshing new recipes into the swiper after reaching the end.

## 8. Running Instructions
- **To start-up the application:** type 'rails s' in the console
- **To get new batch of recipes:** type 'rails db:seed' in the console then run 'rails s' again

- **Sign-Up:** welcome!
- **Sign-In:** welcome back! use your login information 
- **Swipe:** swipe through to find your next loved recipe!
- **Liked:** keep track of your likes!
- **Filter:** don't like an ingredient? Only have 20 minutes to make something? No worries, find a recipe that suits you
- **Add:** add your own recipe using the form!
