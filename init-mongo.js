db.getSiblingDB('admin').auth(
    process.env.MONGO_INITDB_ROOT_USERNAME,
    process.env.MONGO_INITDB_ROOT_PASSWORD
);
db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);
db.createUser({
    user: process.env.MONGO_USER,
    pwd: process.env.MONGO_PASSWORD,
    roles: ["readWrite"],
});
db.createCollection("users", { capped: false });
db.createCollection("posts", { capped: false });
db.createCollection("comments", { capped: false });
