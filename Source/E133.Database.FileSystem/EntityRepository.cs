namespace E133.Database.FileSystem
{
    public abstract class EntityRepository<TDocument>
    {
        private readonly ICollection<TDocument> _collection;

        protected EntityRepository()
        {
            this._collection = new Collection();
        }

        protected ICollection<TDocument> Collection
        {
            get { return this._collection; }
        }
    }
}