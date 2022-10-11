module.exports = (sequelize, dataTypes) => {
    const alias = 'Genre';
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
        name: {
            type: dataTypes.STRING(100)
        },
        ranking: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true
        },
        active: {
            type: dataTypes.BOOLEAN
        }
    }

    const config = {
        tableName: 'genres',
        timestamps: false
    }

    const Genre = sequelize.define(alias, cols, config);

    return Genre

}
