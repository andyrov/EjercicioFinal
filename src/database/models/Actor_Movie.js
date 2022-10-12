module.exports = (sequelize, dataTypes) => {



    const alias = 'Actor_Movie';
    const cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        created_at: {
            type: dataTypes.DATE
        },
        updated_at: {
            type: dataTypes.DATE
        },
        actor_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        movie_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
        
}

const config = {
    tableName: 'actor_movie',
    timestamps: false
}

const Actor_Movie = sequelize.define(alias, cols, config);

return Actor_Movie

}