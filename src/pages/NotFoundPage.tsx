import React from 'react';

export const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="text-2xl mt-4">Página não encontrada!</p>
            <p className="text-md mt-2 text-gray-600">A URL que você tentou acessar não existe.</p>
            <a href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Voltar para a Página Inicial
            </a>
        </div>
    );
};