package ca.tetervak.dicerollerservice.service;

import java.util.List;

public interface DiceRollData {
    List<Integer> getValues();

    int getNumberOfDice();

    int getTotal();
}
