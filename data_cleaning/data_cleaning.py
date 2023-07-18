import pandas as pd

# Read the data from a CSV file
data = pd.read_csv('nba.csv')

# Create DataFrame
df = pd.DataFrame(data)

# Remove dollar sign ($) from salary and convert it to int
df["salary"] = df["salary"].str.replace("$", "").astype(int)

# Merge identical positions
df["position"] = df["position"].str.replace("C-F", "F-C")
df["position"] = df["position"].str.replace("F-G", "G-F")

# Convert draft_peak column to int, excluding non-numeric values
df["draft_peak"] = pd.to_numeric(df["draft_peak"], errors="coerce")

# Exclude non-finite values and convert draft_peak column to integer
df["draft_peak"] = df["draft_peak"].fillna(-1).astype(int)

# Modify the "country" column to group values as "USA" or "Other"
df["country"] = df["country"].apply(lambda x: "USA" if x == "USA" else "Other")

# Filter the DataFrame
filtered_df = df.loc[(df["draft_round"] == '1') & (df["draft_peak"] != -1),
                     ["full_name", "rating", "salary", "position", "country", "draft_peak"]]

# Find the minimum and maximum range of salary
min_salary = df["salary"].min()
max_salary = df["salary"].max()

# Find the minimum and maximum range of rating
min_rating = df["rating"].min()
max_rating = df["rating"].max()

# Print the minimum and maximum range of salary and rating
print("Salary Range: $", min_salary, " - $", max_salary)
print("Rating Range: ", min_rating, " - ", max_rating)


# Aggregate salary by position and calculate average salary separately for USA and other countries
average_salary_by_position = filtered_df.groupby(["country", "position"]).agg(
    average_salary=("salary", "mean"),
    record_count=("salary", "count")
)

# Format float display
pd.options.display.float_format = '{:,.0f}'.format

# Print the average salary by position
print(average_salary_by_position)

# Save the average salary by position to a CSV file
average_salary_by_position.to_csv("average_salary_by_position.csv")


# Select columns "full_name", "rating", "salary", "country", and "position"
salary_rating_table = filtered_df.loc[:, ["country", "position", "full_name", "rating", "salary"]]

# Print the aggregation of players by draft peak range
print(salary_rating_table)

# Save the aggregation of players by draft peak range to a CSV file
salary_rating_table.to_csv("salary_rating_table.csv", index=False)