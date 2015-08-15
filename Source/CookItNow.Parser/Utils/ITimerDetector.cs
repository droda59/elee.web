using System;

namespace CookItNow.Parser.Utils
{
    internal interface ITimerDetector
    {
        bool IsTimeQualifier(string part);

        string Timerify(int time, string word);
    }
}
