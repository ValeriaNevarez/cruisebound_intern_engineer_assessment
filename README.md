# Cruisebound Intern Engineer Assessment

This is my submission for the Cruisebound Intern Engineer Assessment.

## 🎨 Design Decisions

The UI is designed to match the spec in the instructions. I took the following design decisions:

1. **Static vs Dynamic rendering**
   - Decided to fetch the API statically at build time to make the website faster. 

2. **Initial Page Sorting**

   - The default initial page is sorted by nearest departure date.
     This is to show the most immediately available cruises to potential clients,
     improving conversion by highlighting trips they can book soon.

3. **Unique Sailings Display**

   - Only shows unique sailings since API returns duplicates.
   - "Total results count" reflects number of unique sailings.

4. **UI Controls**

   - Changed "Reset filters" to "Reset sorting" button since no filters are present.

5. **Edge Cases Handling**

   - Card component height adjusts for longer itineraries.
   - Default images for missing ship images or logos.
   - Titles standardized in PascalCase.
   - City names simplified:
     - Removed country information and parenthetical content.
     - Added common abbreviations (e.g., Fort → Ft.).

6. **Responsive Design**
   - Cards render vertically on smaller screens.
   - Ensures full visibility of both images and itinerary information.

7. **Pagination**
   - Rendered pagination element with UI as shown in the PDF. 
   - Aligned it to the center of the page, so UI feels smoother. 

## 💻 Software Engineering Best Practices

I implemented software engineering best practices such as:

- Unit tests for utility functions using Jest.
- Granular `git` commits for better traceability and readability.
- Used ESLint for better code quality.
- Code modularity where each component is in its own file.
- Adhered to [Airbnb JSX style guide](https://airbnb.io/javascript/react/).

## 🚀 Technologies

This is a modern web application built with Next.js 15.3.2 and React 19, utilizing TypeScript for type safety and Tailwind CSS for styling. Tools I used:

- [Next.js](https://nextjs.org/) (v15.3.2) - React framework for production.
- [React](https://react.dev/) (v19.0.0) - JavaScript library for user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - Type safety and enhanced developer experience.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
- [HeroIcons](https://heroicons.com/) - Beautiful hand-crafted SVG icons.
- [Cursor](https://www.cursor.com/) - My AI helper 🧙‍♀️🔮. 

## 🚥 Project Structure

```
cruisebound_intern_engineer_assessment/
├── src/
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── interfaces/   # TypeScript interfaces
│   ├── types/        # TypeScript types
│   └── utils/        # Utility functions
└── public/           # Static files
```

**Note:** Unit test files are located next to the file that they test.
