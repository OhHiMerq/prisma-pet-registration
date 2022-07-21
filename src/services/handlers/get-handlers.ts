import express, {Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export const home = async (req:Request,res: Response) => {
    // console.log('--',handlers);
    // func();
    res.render('home');
}

export const getProfileById = async (req:Request,res: Response) => {
    const id = req.params.id
    const pet = await prisma.user.findUnique({
        where:{
            id:Number(id)
        }
    })
    res.render('sum-info',{data:pet,mess:'Pet Profile'})
}

export const petList = async (req:Request,res: Response) => {
    const users = await prisma.user.findMany();
    // res.json(users);
    res.render('pet-list',{data:users});
}

export const regForm = async (req:Request,res: Response) => {
    const values = {
        name: '',
        breed: '',
        sex: ''
    }
    res.render('fill-form',{values:values,mess:'Pet Registration',action:'/submit-reg-form'});
}


export const editFormById = async (req:Request,res: Response) => {
    const id = req.params.id
    const pet = await prisma.user.findUnique({
        where:{
            id:Number(id)
        }
    })
    const values = {
        name: pet?.name,
        breed: pet?.breed,
        sex: pet?.sex
    }
    res.render('fill-form',{values:values,mess:'Edit Pet Profile',action:'/submit-edit-form/' + id});
}

export const deletePetById = async (req:Request,res: Response) => {
        const id = req.params.id
        const deletedPet = await prisma.user.delete({
            where:{
                id:Number(id)
            }
        })
    
        const pets = await prisma.user.findMany();
        res.render('pet-list',{data:pets});
}


// // module.exports = app
// export default {getRouter:router}