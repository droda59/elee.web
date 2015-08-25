﻿using System;

namespace CookItNow.Parser.LanguageUtilities
{
    internal interface ITimerDetector
    {
        bool IsTimeQualifier(string part);

        string Timerify(int time, string word);
    }
}