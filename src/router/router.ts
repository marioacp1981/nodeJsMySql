import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get( '/heroes', ( req: Request, res: Response ) => {
    const query =`
        SELECT * FROM herroes`;
    MySQL.ejecutarQuery( query, ( err:any, heroes: Object[] ) =>{
        if ( err ){
            res.status(400).json({
                ok: false,
                error: err
            })
        }else {
            res.json({
                ok: true,
                heroes
            });
        }
        

    })

});


router.get( '/heroes/:id', ( req: Request, res: Response ) => {
    const id = req.params.id;
    const ecaID = MySQL.instance.cnn.escape( id );
    const query =`
        SELECT * FROM herroes WHERE ID =  ${ecaID} `;
    MySQL.ejecutarQuery( query, ( err:any, heroe: Object[] ) =>{
        if ( err ){
            res.status(400).json({
                ok: false,
                error: err
            })
        }else {
            res.json({
                ok: true,
                heroe: heroe[0]
            });
        }
        

    })
});

export default router;