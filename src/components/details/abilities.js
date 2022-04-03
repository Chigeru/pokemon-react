import React from "react";

import { CapitalFirstLetter } from "../../service/helper";

import classes from "./design/Abilitys.module.css";

import TabletHeadline from "./InfoTabletTemplate/tabletHeadline";
import TabletContent from "./InfoTabletTemplate/tabletContent";

function Abilities({ chosenPokemon }) {
  function GetMovesLearnedAtLeveling() {
    let learnMovesOnLevelUp = [];
    for (let moves of chosenPokemon.moves) {
      for (let learnMethod of moves.version_group_details) {
        if (learnMethod.level_learned_at > 0) {
          learnMovesOnLevelUp.push({
            name: moves.move.name,
            learned_at_level: learnMethod.level_learned_at,
          });
          break;
        }
      }
    }
    learnMovesOnLevelUp.sort((a, b) => a.learned_at_level - b.learned_at_level);
    return learnMovesOnLevelUp;
  }

  GetMovesLearnedAtLeveling();
  return (
    <div>
      <TabletHeadline>Moves learnt by level up</TabletHeadline>
      <TabletContent>
        <table>
          <thead>
            <tr>
              <th>Lv.</th>
              <th>Move</th>
            </tr>
          </thead>
          <tbody>
            {GetMovesLearnedAtLeveling().map((move) => {
              return (
                <tr key={move.name}>
                  <td>{move.learned_at_level}</td>
                  <td>{CapitalFirstLetter(move.name)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TabletContent>
    </div>
  );
}

export default Abilities;
