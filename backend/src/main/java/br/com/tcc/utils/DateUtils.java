package br.com.tcc.utils;

import java.util.Calendar;
import java.util.Date;

public class DateUtils {

    public static Date plusTenYears(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.YEAR, 10);
        return calendar.getTime();
    }
}
