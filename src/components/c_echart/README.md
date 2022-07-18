# Chart 组件说明

+ `seriesData` 为必传递数据。

+ `seriesData` 比 `extraOption` 优先级要高。

  - 当 `extraOption` 中填写了 `series` 和 `seriesData` 同时有数据的时候。 优先显示 `seriesData` 的数据。
  - 当 `extraOption` 中填写了 `series` 和 `seriesData` 为空的时候。 显示 `extraOption` 的数据。
  - 当 `extraOption` 中 `series` 为空时 和 `seriesData` 为空的时候。 显示 `默认数据`。
