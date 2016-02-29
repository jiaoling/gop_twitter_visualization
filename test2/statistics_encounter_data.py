from collections import namedtuple
import csv
import pandas as pd
import numpy as np

df = pd.read_json("encounter_data.js")
df2 = pd.read_json("patient_data.js")
# print(df.head)
# print(df.shape)

# provider_specialty
print("Summary statistics on provider_specialty :")
print(df['provider_specialty'].describe(), '\n')
print("The counts of each value:")
count_by_age = df['encounter_ID'].groupby(df['provider_specialty'])
print(count_by_age.count().sort_values(ascending=0),'\n')

print("No patients has ever been diagnosed as alzheimer")
print(df['alzheimer'].describe(),'\n')
print("No patients has ever been diagnosed as skull injury")
print(df['skull_inj'].describe(), '\n')


print(df['ICD9_order1'].describe())
print("The values of ICD9_order1:", list(set(df.ICD9_order1)), '\n')
print(df['ICD9_order2'].describe())
print("The values of ICD9_order2:", list(set(df.ICD9_order2)), '\n')
print(df['ICD9_order3'].describe())
print("The values of ICD9_order3:", list(set(df.ICD9_order3)),'\n')

print("Correlation Matrix:\n", df.corr(), '\n')
