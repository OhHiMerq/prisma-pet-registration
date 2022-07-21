import express, {Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export const submitRegForm = async (req:Request,res: Response) => {
    const {name,breed,sex} = req.body;
    const user = await prisma.user.create({
        data:{
            name: name,
            breed: breed,
            sex: sex
        }
    })
    // res.json(user);
    res.render('sum-info',{data:user,mess:'Registered Successfully!'});
}

export const submitEditForm = async (req:Request,res: Response) => {
    const id = req.params.id;
    const {name,breed,sex} = req.body;
    const updatedUser = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data:{
            name: name,
            breed: breed,
            sex: sex
        }
    });
    res.render('sum-info',{data:updatedUser,mess:'Editted Successfully!'});
}