<?php

namespace App\Helpers;

use Carbon\Carbon;
use Illuminate\Support\Str;

class AppHelper
{
    /**
     * @param int $digits
     * @return string
     */
    public static function generatePin(int $digits = 4): string
    {
        $i = 0;
        $pin = "";
        while ($i < $digits) {
            $pin .= mt_rand(0, 9);
            $i++;
        }
        return str_pad($pin, $digits, '0', STR_PAD_LEFT);
    }

    static function refIntToSerial(int $nbr, int $digit = 4): string
    {
        $digitNbr = pow(10, $digit);
        $rest = floor($nbr / $digitNbr);
        $suffix = $nbr % $digitNbr;
        $suffix = $suffix == 0 ? 1 : $suffix;
        $firstLetter = mb_chr(floor($rest / 26) + 65);
        $secondLetter = mb_chr($rest % 26 + 65);
        return $firstLetter . $secondLetter . str_pad($suffix, $digit, '0', STR_PAD_LEFT);
    }

    static function refSerialToInt(string $serial, int $digit = 4): int
    {
        $suffixNbr = (int)Str::substr($serial, 2, $digit);

        $firstLetterNbr = (mb_ord($serial[0]) - 65) * 26;
        $secondLetterNbr = mb_ord($serial[1]) - 65;
        $rest = $firstLetterNbr + $secondLetterNbr;
        return ($rest * pow(10, $digit)) + $suffixNbr;
    }
}
