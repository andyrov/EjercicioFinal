module.exports = (sequelize, dataTypes) => {



    const alias = 'Movie';
    const cols = {
        id: {
            type: dataTypes. INTEGER.UNSIGNED,
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
        title: {
            type: dataTypes.STRING(500)
        },
        rating: {
            type: dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull: false
        },
        awards: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        release_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: dataTypes.DATE
        },
        length: {
            type: dataTypes.INTEGER.UNSIGNED,
        },
        genre_id: {
            type: dataTypes.INTEGER.UNSIGNED,
        },
    }

    const config = {
        tableName: 'movies',
        timestamps: false
    }

    const Movie = sequelize.define(alias, cols, config);

    return Movie

}