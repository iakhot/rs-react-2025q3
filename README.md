# react2025Q3

This is a training project for [RS School React course](https://github.com/rolling-scopes-school/tasks/tree/master/react).

## Task 8. Performance

Smoke test:

1. Wait for data to load
2. Start profiling
3. Scroll down, open some Country details
4. Add more columns to display
5. Apply filter by year
6. Sort by Country name, sort by Population several times
7. Apply filter by Name ('Bel') - found 3 rows
8. Clear all filters - causes data reload
9. Sort
10. Repeat 3-9 several times

### Unoptimized build (commit 3ca4a4a46)

- Commit Duration: max = 1.9s, screen is for commit #29
  ![Unoptimized build commit duration](/src/assets/report/nop-c29-time-commit.jpg)
- Render Duration: max = 5.1s
- Interactions: max filter = 6.1s, max sort = 7.3s
  ![Unoptimized build interactions](/src/assets/report/nop-c29-interact.jpg)
- Flame Graph: for commit #29
  ![Unoptimized build Flamechart](/src/assets/report/nop-c29-flame.jpg)
- Ranked Chart: for commit #29
  ![Unoptimized build Rankedchart](/src/assets/report/nop-c29-rank.jpg)

### Optimized build (commit 3abb4ece5)

- Commit Duration: max = 1.9s, screen is for commit #42
  ![Optimized build commit duration](/src/assets/report/opt-commit-2.jpg)
- Render Duration: max = 5.5s
- Interactions: max filter = 6.6s, max sort = 8s
  ![Optimized build interactions](/src/assets/report/opt-inter-2.jpg)
- Flame Graph: for commit #42
  ![Optimized build Flamechart](/src/assets/report/opt-c42-flame-2.jpg)
- Ranked Chart: for commit #42
  ![Optimized build Rankedchart](/src/assets/report/opt-c42-rank-2.jpg)

### Summary

Based on the current results, I cannot see much performance improvements. Partially, I think it depends on amount of collected data (quantity of test runs) and variability and quality of test scenarios that've been performed.
