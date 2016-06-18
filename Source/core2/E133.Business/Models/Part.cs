using System.Diagnostics;

namespace E133.Business.Models
{
    [DebuggerDisplay("{DebuggerDisplay}")]
    public abstract class Part
    {
        public abstract string Type { get; }

        internal abstract string DebuggerDisplay { get; }
    }
}