package study.hk.lib;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class StringExt {

    private static StringExt _instance = null;

    public static StringExt GetInstance()
    {
        if(_instance == null) {
            _instance = new StringExt();
        }

        return _instance;
    }

    public List<String> GetDivide(String text) {

        List<String> resultList = new ArrayList<String>();
        /*String temp = "Are you from an affluent background?";*/

        String[] abc = text.split(" ");

        Random rand;

        rand = new Random();

        int min, max;

        String node1 = abc[0];
        String node2 = "";
        String node3 = "";

        min = 1;
        max = abc.length / 3;

        int randomNum = rand.nextInt(max - min + 1) + min;

        if (min == randomNum) {
            randomNum++;
        }

        for (int i = min; i < randomNum; i++) {
            node1 += " " + abc[i];
        }

        min = randomNum;
        max = abc.length - 1;

        randomNum = rand.nextInt(max - min + 1) + min;

        if (min == randomNum) {
            randomNum++;
        }

        for (int i = min; i < randomNum; i++) {
            node2 += " " + abc[i];
        }

        min = randomNum;
        max = abc.length;

        for (int i = min; i < abc.length; i++) {
            node3 += " " + abc[i];
        }

        resultList.add(node1);
        resultList.add(node2);
        resultList.add(node3);

        System.out.println(node1);
        System.out.println(node2);
        System.out.println(node3);

        String result = node1 + node2 + node3;
        System.out.println(result);
        return resultList;
    }

}
