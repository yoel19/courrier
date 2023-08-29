<?php

namespace App\Helpers;

use App\Models\SmsLog;
use App\Utils\Sms\SMS;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;


class PhoneHelper
{
    const telcos = array(
        [
            'name' => 'Togocel',
            'prefixList' => ['90', '91', '92', '93', '70']
        ],
        [
            'name' => 'Moov',
            'prefixList' => ['96', '97', '98', '99', '79']
        ],

    );

    /**
     * @param string $phone
     * @return string
     * @throws Exception
     */
    public static function normalizeTgPhone(string $phone): string
    {
        $firstPhone = explode('/', $phone)[0];
        $normalizePhone = (int)filter_var($firstPhone, FILTER_SANITIZE_NUMBER_INT);
        $normalizePhoneStr = (string)$normalizePhone;
        $normalizePhoneLength = Str::length($normalizePhoneStr);

        if ($normalizePhoneLength == 8) {
            $normalizePhoneStr = '228' . $normalizePhoneStr;
        }

        if (Str::length($normalizePhoneStr) != 11 || Str::substr($normalizePhoneStr, 0, 3) != '228') {
            throw new Exception('invalid togolese phone number:' . $phone, 405);
        }

        return $normalizePhoneStr;
    }

    /**
     * @param string $phone
     * @return string
     * @throws Exception
     */
    public static function getTgTelco(string $phone): string
    {
        try {
            $normalizePhone = self::normalizeTgPhone($phone);
            foreach (self::telcos as $telco) {
                if (in_array(Str::substr($normalizePhone, 3, 2), $telco['prefixList'])) {
                    return $telco['name'];
                }
            }
            return 'Unknown';
        } catch (Exception $e) {
            throw new Exception($e->getMessage(), $e->getCode());
        }

    }

    /**
     * @param string $phone
     * @return bool
     * @throws Exception
     */
    public static function isTgTelco(string $phone): bool
    {
        try {
            return self::getTgTelco($phone) != 'Unknown';
        } catch (Exception $e) {
            throw new Exception($e->getMessage(), $e->getCode());
        }

    }

    /**
     * @param string $phone
     * @return string
     * @throws Exception
     */
    public static function getTgTelcoWallet(string $phone): string
    {
        try {
            $telcoName = self::getTgTelco($phone);
            return match ($telcoName) {
                'Togocel' => 'Tmoney',
                'Moov' => 'MoovMoney',
                default => 'Unknown',
            };
        } catch (Exception $e) {
            throw new Exception($e->getMessage(), $e->getCode());
        }

    }

    /**
     * @throws Exception
     * @throws Throwable
     */
    public static function sendSms($type, $phone, $text): bool
    {
        try {
            if (!config('sms.sms_prod')) {
                Log::info('sendSmsTest: ', [$phone, $text]);
                return true;
            }
            if (!self::isTgTelco($phone)) {
                Log::info('sendSmsInvalidPhone: ', [$phone, $text]);
                return false;
            }

            return SMS::send($type, $phone, $text);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('sendSmsException: ' . ($phone ?? '') . '|' . $e->getMessage());

            return false;
        }
    }

}
