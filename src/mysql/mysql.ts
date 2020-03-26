import mysql = require('mysql');

export default class MySQL {
    private static _instance: MySQL;

    cnn: mysql.Connection;
    conectado: boolean = false;


    constructor() {
        console.log('Clase Con Inicializada');

        this.cnn = mysql.createConnection({
            host     : 'localhost',
            user     : 'node_user2',
            password : '123456',
            database : 'node_bd'
          });

          this.conectarDB();
    }

    public static get instance(){
        return this._instance  || ( this._instance = new this() );
    }

    static ejecutarQuery( query: string, callback: Function ) {
        this.instance.cnn.query(query, ( err, results: Object[], fields ) => {
                if ( err ){
                    console.log('Error en Query');
                    console.log(err);
                    return callback( err );
                }
                if( results.length === 0)
                {
                    callback('No existe el registro')
                }else{
                    callback( null, results)

                }
               
        });
    }



    private conectarDB() {
        this.cnn.connect( (err: mysql.MysqlError ) =>{
            if( err ){
                console.log(err.message);
                return;
            }
        });

        this.conectado = true;
        console.log('BD Online');
    }

}