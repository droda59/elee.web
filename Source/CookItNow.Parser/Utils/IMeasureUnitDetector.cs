using CookItNow.Business;

namespace CookItNow.Parser.Utils
{
    internal interface IMeasureUnitDetector
    {
        MeasureUnit GetMeasureUnit(string measureUnit);
    }
}