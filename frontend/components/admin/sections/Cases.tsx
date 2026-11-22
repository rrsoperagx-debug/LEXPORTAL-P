import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Briefcase,
  ExternalLink,
  Calendar,
  User,
  Clock,
  MoreHorizontal,
  FileText,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const CasesSection: React.FC = () => {
  const { token } = useAuth();
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const fetchCases = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/v1/cases/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCases(data);
      }
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, [token]);

  const filteredCases = cases.filter(
    (c) =>
      c.title.toLowerCase().includes(filter.toLowerCase()) ||
      (c.description &&
        c.description.toLowerCase().includes(filter.toLowerCase())),
  );

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <CardTitle>Zarządzanie Pismami i Sprawami</CardTitle>
          <CardDescription>
            Monitoruj status postępowań i zarządzaj dokumentacją klientów.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Szukaj spraw..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-9 w-64 bg-slate-50 dark:bg-slate-900 border-none shadow-sm"
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Plus className="h-4 w-4" /> Nowa Sprawa
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-12 bg-slate-100 dark:bg-slate-900 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 dark:bg-slate-900/50">
                <TableHead className="font-bold">Sprawa (Tytuł)</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Klient</TableHead>
                <TableHead className="font-bold">Dokumenty</TableHead>
                <TableHead className="font-bold">Data utworzenia</TableHead>
                <TableHead className="text-right font-bold">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.length > 0 ? (
                filteredCases.map((c) => (
                  <TableRow
                    key={c.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold">{c.title}</span>
                        <span className="text-xs text-slate-500 line-clamp-1">
                          {c.description || "Brak opisu"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          c.status === "open"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none"
                            : c.status === "closed_success"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-none"
                              : "bg-slate-100 text-slate-700 dark:bg-slate-900/40 dark:text-slate-400 border-none"
                        }
                      >
                        {c.status === "open"
                          ? "Otwarta"
                          : c.status === "closed_success"
                            ? "Wygrana"
                            : "Zakończona"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-slate-500" />
                        <span className="text-xs">
                          ID: {c.user_id.substring(0, 8)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3 text-slate-500" />
                        <span className="text-xs font-medium">
                          {c.documents?.length || 0} pism
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-500 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(c.created_at).toLocaleDateString("pl-PL")}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Działania</DropdownMenuLabel>
                          <DropdownMenuItem className="gap-2">
                            <ExternalLink className="h-4 w-4" /> Otwórz sprawę
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <FileText className="h-4 w-4" /> Dodaj dokument
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-blue-600 font-medium">
                            Zmień status
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-slate-500 italic"
                  >
                    Brak spraw do wyświetlenia.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

// Helper for 'Plus' icon since I missed it in imports
const Plus = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);
