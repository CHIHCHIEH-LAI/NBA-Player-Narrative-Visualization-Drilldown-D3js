# NBA Players Visualization
This project aims to create an interactive narrative visualization for NBA player contracts, providing insights into player salaries and ratings. The visualization allows users to explore the average salaries of NBA first-round drafted players by position and analyze the relationship between salary and 2K rating for different positions and countries.

## Project Requirements
- Display an overview bar chart showing the average salary of NBA first-round drafted players by position.
- Provide a drop-down menu to select players from the USA or other countries.
- Enable users to drill-down into a scatterplot showing the detailed information of salary and rating for the selected position. 
- Implement interactive features such as hovering over bars and data points to display additional information.
- Include line annotations to distinguish player tiers based on ratings.
- Allow users to go back to the overview bar chart from the scatterplot.

## How to Use
1. Clone the repository to your local machine.
2. Open the project in a web browser.
3. The initial view will display the overview bar chart, showcasing the average salaries of NBA first-round drafted players by position.
4. Use the drop-down menu to select players from the USA or other countries. The chart will update accordingly.
5. Hover over any bar in the chart to view additional details such as record count, average salary, and position.
6. Click on a bar to drill-down into the scatterplot for more detailed information.
7. In the scatterplot, explore the relationship between salary and 2K rating for the selected position.
8. Hover over any data point to see the player's name, salary, and 2K rating.
9. Line annotations indicate different player tiers such as superstars, all-stars, starters, and role players.
10. To go back to the overview bar chart, click the "Go Back" button at the top left corner of the scatterplot.

## Narrative Description
The NBA free agent market is always exciting to NBA fans. However, whether a signed player is too expensive or worth the price is always a strong debate on social media. Thus, this narrative visualization was created to assist fans in determining whether a contract is a good deal.

The visualization follows a drop-down story structure, allowing users to click on any bar in the overview bar chart to drill-down into the scatterplot for more details. In the first scene, users can explore the average salaries of NBA first-round drafted players by position, with the option to select players from the USA or other countries.

The second scene features a scatterplot that illustrates the relationship between a player's salary and their 2K rating for the selected position. Line annotations divide the data points into tiers such as superstars, all-stars, starters, and role players, providing users with a better understanding of player ratings.

The parameters of the visualization include the selected country, selected position, and the state of the scene. Users can select different countries and positions using the drop-down menu, drill-down into the scatterplot, and go back to the overview bar chart.

## Dependencies
- D3.js library (v6): https://d3js.org/
- d3-annotation library: https://github.com/susielu/d3-annotation
- topoJSON Client library: https://github.com/topojson/topojson-client

## Demo
[Demo Link](https://chihchieh-lai.github.io/)

## Credits
The dataset used in this visualization is [nba.csv](https://www.kaggle.com/datasets/isaienkov/nba2k20-player-dataset)
