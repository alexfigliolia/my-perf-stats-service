export class MonthlyPerUser {
  public static command = `git log --author="Toon Baeyens" --pretty=tformat: --numstat --since="1 Jun, 2020" --until="1 July, 2020" | awk '{inserted+=$1; deleted+=$2; delta+=$1-$2; ratio=deleted/inserted} END {printf "Commit stats:\n- Lines added (total)....  %s\n- Lines deleted (total)..  %s\n- Total lines (delta)....  %s\n- Add./Del. ratio (1:n)..  1 : %s\n", inserted, deleted, delta, ratio }' -`;
}
