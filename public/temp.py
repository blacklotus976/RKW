# def profit_function_NOOH(targets, takeouts):
#     if len(targets) != len(takeouts):
#         exit("itachi_error:profit_function_NOOH: len(targets) != len(takeouts)")

#     results = []
#     #returns to open case
#     results.append(targets[0]*takeouts[0])
#     #returns to previous case
#     for i in range(1, len(targets)-1):
#         current_max_target = i
#         add_up_till_that_point = 0
#         amount=100
#         for j in range(current_max_target):
#             add_up_till_that_point += targets[j]*takeouts[j]/100
#             ammount -= takeouts[j]
#         add_up_till_that_point+=amount/100*targets[current_max_target-1]
#         add_up_till_that_point-=targets[current_max_target-1]

#         results.append(add_up_till_that_point)

#     #extreme case
#     results.append(sum([targets[i]*takeouts[i]/100 for i in range(len(targets))]) - targets[-1])
#     return results


# import pandas as pd

# pd.set_option('display.max_rows', None)
# # pd.set_option('display.max_columns', None)
# # pd.set_option('display.width', None)
# pd.set_option('display.colheader_justify', 'left')
# pd.set_option('display.precision', 7)
# # pd.set_option('display.max_colwidth', None)


# print(f"++++++++NOOH SUS RESULTS++++++++")
# results_df = pd.read_csv("C:/Users/james/OneDrive/Υπολογιστής/SIMULATIONS/NOOH/NOOH_1_1/nooh_sus_1_1_dec24.csv")
# print(f"+++++++++++++++++++++++++++++++++++++++++++++")
# sorted_df = results_df.sort_values(by=['avg_profit_per_trade', 'net'], ascending=[False, False])
# top_results = sorted_df.head(20)
# print("Top Simulations Based on Average Profit Per Trade and Net Profit:")
# print(top_results)
# print(f"+++++++++++++++++++++++++++++++++++++++++++++")
# sorted_df = results_df.sort_values(by=['net', 'avg_profit_per_trade'], ascending=[False, False])
# top_results = sorted_df.head(20)
# print("Top Simulations Based on Net and Average Profit Per Trade Profit:")
# print(top_results)
# print(f"+++++++++++++++++++++++++++++++++++++++++++++")
# new_df = results_df[(results_df['avg_profit_per_trade'] > 0.4)].sort_values(by=['net'], ascending=[False])
# print(new_df[['net', 'takeouts', 'look_back', 'target_adjustment_factor', 'threshold', 'avg_profit_per_trade']].head(50))













                        

def compute_features(df):
    """Compute aggregated features for a given DataFrame."""
    features = {
        "volatility_mean": df["high"].sub(df["low"]).mean(),
        "volatility_std": df["high"].sub(df["low"]).std(),
        "price_change_mean": df["close"].pct_change().mean(),
        "price_change_std": df["close"].pct_change().std(),
        "volume_change_mean": df["volume"].pct_change().mean(),
        "volume_change_std": df["volume"].pct_change().std(),
        "rolling_mean_mean": df["close"].rolling(window=14).mean().mean(),
        "rolling_std_mean": df["close"].rolling(window=14).std().mean(),
    }
    return features

    def NOOH_auto_adjsuted_SUS_CENTRIC_ONE_SESSION(self, df, current_i, how_many_targets, takeouts,
                                                   look_back=60, central_area=60):
        opened_hedge = False
        trading_amount = 100
        cases_counter = 0
        profits = 0
        for i in range(current_i, len(df)):
            if i >= len(df):
                return None, i
            current_price = df['close'].iloc[i]

            if opened_hedge == False:
                last_rows = df.iloc[i - look_back:i]
                # Calculate highest, lowest, and total range
                highest = last_rows['high'].max()
                lowest = last_rows['low'].min()
                total_range = highest - lowest
                lower_bound = lowest + total_range * (1 - central_area / 100) / 2
                upper_bound = highest - total_range * (1 - central_area / 100) / 2
                in_central_zone = lower_bound <= current_price <= upper_bound
                if in_central_zone:
                    distance_to_lowest = (current_price - lowest) / current_price * 100
                    distance_to_highest = (highest - current_price) / current_price * 100
                    step = max(distance_to_lowest, distance_to_highest)
                    targets = [step * t for t in range(1, how_many_targets + 1)]

                else:
                    continue
                open_price = current_price
                long_price_targets = list()
                short_price_targets = list()
                for target in targets:
                    long_price_targets.append(open_price + target * open_price / 100)
                    short_price_targets.append(open_price - target * open_price / 100)
                long_amount = trading_amount
                short_amount = trading_amount
                opened_hedge = True
                hedge_profit = 0
                short_targets_achieved = [False] * len(short_price_targets)
                long_targets_achieved = [False] * len(long_price_targets)

            else:
                if current_price > open_price:
                    if any(short_targets_achieved):
                        opened_hedge = False
                        long_realizing = (current_price - open_price) / open_price * long_amount
                        short_realizing = (open_price - current_price) / open_price * short_amount
                        hedge_profit += long_realizing + short_realizing
                        profits += hedge_profit
                        return hedge_profit, i

                    for i in range(len(long_price_targets)):
                        if current_price >= long_price_targets[i] and not long_targets_achieved[i]:
                            if i == len(long_price_targets) - 1:
                                long_realizing = (current_price - open_price) / open_price * long_amount
                                short_realizing = (open_price - current_price) / open_price * short_amount
                                hedge_profit += long_realizing + short_realizing
                                opened_hedge = False
                                profits += hedge_profit
                                return hedge_profit, i
                            else:
                                long_targets_achieved[i] = True
                                long_realizing = (current_price - open_price) / open_price * takeouts[i]
                                long_amount = long_amount - takeouts[i]
                                hedge_profit += long_realizing
                                continue

                    for i in range(len(long_price_targets) - 1):
                        if current_price < long_price_targets[i] and long_targets_achieved[i + 1]:
                            opened_hedge = False
                            long_realizing = (current_price - open_price) / open_price * long_amount
                            short_realizing = (open_price - current_price) / open_price * short_amount
                            hedge_profit += long_realizing + short_realizing
                            profits += hedge_profit
                            return hedge_profit, i
                if current_price < open_price:
                    if any(long_targets_achieved):
                        opened_hedge = False
                        long_realizing = (current_price - open_price) / open_price * long_amount
                        short_realizing = (open_price - current_price) / open_price * short_amount
                        hedge_profit += long_realizing + short_realizing
                        profits += hedge_profit
                        return hedge_profit, i

                    for i in range(len(short_price_targets)):
                        if current_price <= short_price_targets[i] and not short_targets_achieved[i]:
                            if i == len(short_price_targets) - 1:
                                long_realizing = (current_price - open_price) / open_price * long_amount
                                short_realizing = (open_price - current_price) / open_price * short_amount
                                hedge_profit += long_realizing + short_realizing
                                opened_hedge = False
                                profits += hedge_profit
                                return hedge_profit, i
                            else:
                                short_targets_achieved[i] = True
                                short_realizing = (open_price - current_price) / open_price * takeouts[i]
                                short_amount = short_amount - takeouts[i]
                                hedge_profit += short_realizing
                                continue

                    for i in range(len(short_price_targets) - 1):
                        if current_price > short_price_targets[i] and short_targets_achieved[i + 1]:
                            opened_hedge = False
                            long_realizing = (current_price - open_price) / open_price * long_amount
                            short_realizing = (open_price - current_price) / open_price * short_amount
                            hedge_profit += long_realizing + short_realizing
                            profits += hedge_profit
                            return hedge_profit, i