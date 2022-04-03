import React from "react";

import TabletHeadline from "./InfoTabletTemplate/tabletHeadline";
import TabletContent from "./InfoTabletTemplate/tabletContent";

import classes from "./design/Stats.module.css";

function stats({ stats }) {
  return (
    <div>
      <TabletHeadline>Stats</TabletHeadline>
      <TabletContent>
        <div className={classes.statsContainer}>
          <table>
            <tbody>
              {stats.map((stat) => {
                return (
                  <tr key={stat.stat.name}>
                    <th>
                      {stat.stat.name}
                    </th>
                    <td>
                      <p className={classes.statsValueText}>{stat.base_stat}</p>
                    </td>
                    <td>
                      <div className={classes.statBarContainer}>
                        0
                        <div className={classes.statBar}>
                          <div
                            style={{
                              width: (stat.base_stat / 255) * 100 + "%",
                            }}
                          ></div>
                        </div>
                        255
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TabletContent>
    </div>
  );
}

export default stats;
