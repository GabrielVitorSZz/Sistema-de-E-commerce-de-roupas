import React from 'react';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductCard } from '../components/ProductCard';
import { IProduto } from '../models/interfaces/IProduto';

interface HomePageProps {
    produtosFiltrados: IProduto[];
    categorias: string[];
    categoriaSelecionada: string;
    onCategoryChange: (category: string) => void;
    onAddToCart: (produto: IProduto) => void;
    onViewDetails: (produto: IProduto) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
                                                      produtosFiltrados,
                                                      categorias,
                                                      categoriaSelecionada,
                                                      onCategoryChange,
                                                      onAddToCart,
                                                      onViewDetails
                                                  }) => {
    return (
        <>
            <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bem-vindo!
    </h1>
    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
    Descubra as últimas tendências em moda com nossa coleção exclusiva de roupas e acessórios
    </p>
    </div>
    <CategoryFilter
    categories={categorias}
    selectedCategory={categoriaSelecionada}
    onCategoryChange={onCategoryChange}
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {produtosFiltrados.map((produto) => (
                <ProductCard
                    key={produto.id}
            produto={produto}
            onAddToCart={onAddToCart}
            onViewDetails={onViewDetails}
    />
))}
    </div>
    {produtosFiltrados.length === 0 && (
        <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Nenhum produto encontrado nesta categoria.</p>
    </div>
    )}
    </>
);
};