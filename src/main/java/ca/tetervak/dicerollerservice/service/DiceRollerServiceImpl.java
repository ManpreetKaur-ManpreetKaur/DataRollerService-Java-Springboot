package ca.tetervak.dicerollerservice.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class DiceRollerServiceImpl implements DiceRollerService{

    private final Random random;

    public DiceRollerServiceImpl(Random random) {
        this.random = random;
    }

    public DiceRollerServiceImpl() {
        this(new Random());
    }

    @Override
    public DiceRollData getRollData(int numberOfDice) {

        List<Integer> list = random
                .ints(numberOfDice, 1, 7)
                .boxed()
                .collect(Collectors.toList());

        return new DiceRollDataImpl(list);
    }
}
