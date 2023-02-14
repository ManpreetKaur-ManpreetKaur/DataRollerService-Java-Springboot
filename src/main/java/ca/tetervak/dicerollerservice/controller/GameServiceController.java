package ca.tetervak.dicerollerservice.controller;

import ca.tetervak.dicerollerservice.service.DiceRollData;
import ca.tetervak.dicerollerservice.service.DiceRollerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class GameServiceController {

    private final Logger log = LoggerFactory.getLogger(GameServiceController.class);

    private final DiceRollerService diceRollerService;


    public GameServiceController(DiceRollerService diceRollerService) {
        this.diceRollerService = diceRollerService;
    }

    @GetMapping( "/roll-dice")
    public DiceRollData rollDice(
            @RequestParam(defaultValue = "3") int numberOfDice
    ){
        log.trace("diceGame() is called");
        log.debug("numberOfDice = " + numberOfDice);

        DiceRollData rollData;
        if(numberOfDice > 0 && numberOfDice <= 5){
            rollData = diceRollerService.getRollData(numberOfDice);
        }else{
            log.warn("the numberOfDice is out of the range " + numberOfDice);
            rollData = diceRollerService.getRollData(3);
        }
        log.debug("rollData = " + rollData);
        return  rollData;
    }
}
