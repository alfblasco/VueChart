export default function(collection, otherCollection) {
	otherCollection = new Set(otherCollection);
	return collection.filter(value => otherCollection.has(value));
}
